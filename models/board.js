const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required :false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pins: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pin',
        required: true,
        default: [],
    },
    numberOfPins: {
        type: Number,
        required: true
    },

});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;