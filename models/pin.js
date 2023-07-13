const mongoose = require('mongoose');
const Schema = mongoose.Schema


const pinSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    }
});

module.exports = mongoose.model('Pin', pinSchema);

// Define the Comment schema
const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create the Comment model
  const Comment = mongoose.model('Comment', commentSchema);
  
  module.exports = Comment;