const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3000;
const secretkey = '12x442X1';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const User_old = [
  {
    id: '1',
    userId: 'admin',
    password: 'admin1',
    userType: 'Admin',
    isActive: true
  }
];


const redis = require('redis');
const redisClient = redis.createClient({
  url: 'redis://:redispassword@cache-service:6379' // localhost when calling from host, else service name 'cache-service'
});
redisClient.connect()
  .then(async () => {
    await redisClient.set('testing', 'Redis! Connection is successful.');
    const value = await redisClient.get('testing');
    console.log(value);
    //redisClient.quit();
  })
  .catch(err => console.error('Redis Client Error', err));




//DB access from host machine/localhost
//mongoose.connect('mongodb://admin:admin@localhost:27017/?authSource=admin'

//DB access from container
//mongoose.connect('mongodb://admin:admin@mongodb:27017/?authSource=admin'

mongoose.connect('mongodb://admin:admin@mongodb:27017/?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Login Route
app.post('/login', async (req, res) => {
  const payload = req.body; // Access the entire payload
  const creduser = await User_old.filter(x => x.userId == payload.userId);
  
  if (creduser.length == 1 && payload.password == creduser[0].password) {
    const token = jwt.sign({ userId: creduser[0].userId, role: creduser[0].userType }, secretkey);
    return res.send({ token });
  } else {

    const user = await User.findOne({ userId: payload.userId });
    if (user && bcrypt.compareSync(payload.password, user.password)) {
      const token = jwt.sign({ userId: user.userId, role: user.userType }, secretkey);
      return res.send({ token });
    }

    return res.status(401).send({ message: 'Invalid credentials' });
  }
});

// Add new user
app.post('/add', async (req, res) => {
  let user = new User({ ...req.body });
  const pass = bcrypt.hashSync(user.password);
  user.password = pass;
  await user.save();
  await clearCache(`users`);
  res.status(201).send(user);
});

// Get all users
app.get('/users', async (req, res) => {

  // 1. Check users in cache
  const cachedUser = await redisClient.get(`users`);
  console.log('is all user cache available:', cachedUser);
  if (cachedUser) {
    return res.json({ source: "cache", data: JSON.parse(cachedUser) });
  }

  // 2. If not in cache then get user from MongoDB
  const users = await User.find();

  // 3. Store users data in cache
  if (users) {
    await updateCache(`users`, users);
  }

  res.json({ source: "db", data: users });
});

// Get a user details by id
app.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Check users in cache
    const cachedUser = await getCache(userId);
    if (cachedUser) {
      return res.json({ source: "cache", data: JSON.parse(cachedUser) });
    }

    // 2. If not in cache then get user from MongoDB
    const user = await User.findById(userId);

    // 3. Store users data in cache
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user) {
      await updateCache(userId, user);
    }
    
    return res.json({ source: "db", data: user });

  } catch (err) {
    res.status(400).send({ message: 'Invalid ID format', error: err.message });
  }
});

// Delete a user by id
app.delete('/delete/:id', async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  await clearCache(`users`);
  res.send({ message: 'User deleted' });
});

app.listen(port, () => { console.log(`Server listening on port ${port}`); });

async function getCache(dataKey) {
  const value = redisClient.get(dataKey);
  return value;
}

async function updateCache(dataKey, data) {
  console.log('updateCache', dataKey);
  await redisClient.set(dataKey, JSON.stringify(data), { EX: 60 }); // cache for 60 seconds
}

async function clearCache(dataKey) {
  await redisClient.del(dataKey, (err, response) => {
    if (err) throw err;
    console.log(`Deleted ${response} key(s)`); // response will be 1 if deleted, 0 if not found
  });
}
