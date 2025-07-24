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

// Connect this Node.js api when running on host machine and MongoDB running in Docker container
//mongoose.connect('mongodb://admin:admin@localhost:27017/?authSource=admin', {

// Connect this Node.js api and MongoDB running in Docker container with same network
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
  res.status(201).send(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Get a user details by id
app.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(user);
  } catch (err) {
    res.status(400).send({ message: 'Invalid ID format', error: err.message });
  }
});

// Delete a user by id
app.delete('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
});

app.listen(port, () => { console.log(`Server listening on port ${port}`); });
