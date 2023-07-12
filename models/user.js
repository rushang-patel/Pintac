const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true 
    },
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true   

});

const User = mongoose.model('User', userSchema);

module.exports = User;
