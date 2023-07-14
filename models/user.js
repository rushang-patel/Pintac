const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: false // Set to false if userId is optional
    },
    userName: {
      type: String,
      required: false // Set to false if userName is optional
    },
    email: {
      type: String,
      required: true
    },
    avatar: String
  }, {
    timestamps: true
  });

const User = mongoose.model('User', userSchema);

module.exports = User;

