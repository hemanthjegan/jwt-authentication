const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password_hash: String,
    api_key: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('User', userSchema);
