const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    isActive: Boolean,
    password: String,
    userId: String,
    userType: String
});

module.exports = mongoose.model('User', userSchema);