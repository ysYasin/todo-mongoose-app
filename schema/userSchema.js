const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
})
module.exports = UserSchema;