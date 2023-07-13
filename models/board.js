const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const title = new Schema ({
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required :false,
    },
    user_id: {
        type: String,
        required: true,
    },
    pins: {
        type: Array,
        required: true,
        default: [favorites],
    },
    numberOfPins: {
        type: number,
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