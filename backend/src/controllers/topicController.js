const User = require('../models/UserSchema');
const { find } = require('./../models/TopicSchema');
const Topic = require('./../models/TopicSchema');

const getTopics = async (req, res) => {
    const { sort, filter } = req.query;
    const sortQuery = sort || {};
    const filterQuery = filter || {};

    try{
        const topics = await Topic.find(filterQuery).sort(sortQuery);

        return res.status(200).json(topics);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const getTopic = async (req, res) => {
    const { id } = req.params;

    try{
        const topic = await Topic.findById(id);
        if(!topic)
            return res.status(404).json('Topic not found');

        return res.status(200).json(topic);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const createTopic = async (req, res) => {
    console.log(req.user);
    if(req.user.role !== 'admin')
        return res.status(403).json('Not authorized');

    const { name, description } = req.body;
    const picture = req.file?.filename;
    console.log(req.file);
    const topic = {name: name, picture: picture};
    if(description)
        topic.description = description;
    if(picture)
        topic.picture = picture;

    try{
        const newTopic = new Topic(topic);
        await newTopic.save();

        return res.status(201).json('Added a new topic');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const updateTopic = async (req, res) => {
    if(req.user.role !== 'admin')
        return res.status(403).json('Not authorized');

    const { name, description } = req.body;
    const picture = req.file.filename;
    const { topicName } = req.params;

    if(!name && !description && !picture)
        return res.status(400).json('There are missing fields');

    const updatedValues = {};
    if(name)
        updatedValues.name = name;
    if(description)
        updatedValues.description = description;
    if(picture)
        updatedValues.picture = picture;

    try{
        const updatedTopic = await Topic.findOneAndUpdate({name: topicName}, updatedValues, {new: true});
        if(!updatedTopic)
            return res.status(404).json('Topic not found');
        
        return res.status(200).json(updatedTopic);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const deleteTopic = async (req, res) => {
    if(req.user.role !== 'admin')
        return res.status(403).json('Not authorized');

    const { topicName } = req.params;

    try{
        const topic = await Topic.findAndDelete(topicName);
        if(!topic)
            return res.status(404).json('Topic not found');

        return res.status(200).json('Topic has been deleted');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

module.exports = {
    getTopics,
    getTopic,
    createTopic,
    updateTopic,
    deleteTopic,
};