const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        default: "",
        max: 200,
        required: true,
    },
    links: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;