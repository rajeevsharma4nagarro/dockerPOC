const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://mongo:27017/userdb');

const User = mongoose.model('User', new mongoose.Schema({
  userId: string,
  password: string,
  userType: string,
  isActive: boolean
}));

async function seed() {
  await User.deleteMany();
  await User.create([
    {
      userId: 'superuser',
      password: bcrypt.hashSync('super1'),
      userType: 'SuperUser',
      isActive: true
    },
    {
      userId: 'Admin',
      password: bcrypt.hashSync('admin1'),
      userType: 'Admin',
      isActive: true
    },
    {
      userId: 'User',
      password: bcrypt.hashSync('user1'),
      userType: 'User',
      isActive: true
    }
  ]);
  console.log('Seeded DB');
  process.exit();
}

seed();
