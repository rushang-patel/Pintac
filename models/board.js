const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  },
  pins: {
    type: Array,
    required: true,
    default: [] // Corrected default value
  },
  numberOfPins: {
    type: Number, // Corrected capitalization
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
