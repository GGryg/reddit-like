const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "",
        max: 200,
    },
    picture: {
        type: String,
        default: 'topics/default_topic.jpg',
    },
});

const Topic = mongoose.model("Topic", TopicSchema);

module.exports = Topic;