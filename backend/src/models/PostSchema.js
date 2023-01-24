const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        default: "",
        max: 200,
    },
    picture: {
        type: String,
    },
    links: {
        type: String,
        default: '',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;