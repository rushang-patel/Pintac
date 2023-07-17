const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
