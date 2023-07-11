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
    }
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    }
});

const Pin = mongoose.model('Pin', pinSchema);
