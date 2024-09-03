const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,  // Changed from Number to String
        required: true
    },
    password: {
        type: String,  // Changed from Number to String
        required: true
    },
    date: {
        type: Date,  // Changed from date to Date
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
