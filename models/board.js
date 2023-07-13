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
        default: [favorites],
    },
    numberOfPins: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Board', boardSchema);