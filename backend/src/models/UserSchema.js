const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
        max: 200,
    },
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        type: String,
        default: 'avatars/avatar_default.jpg',
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;