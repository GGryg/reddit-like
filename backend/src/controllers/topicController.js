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
    const { topicName } = req.params;

    try{
        const topic = await Topic.findOne({name: topicName});
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
    if(req.user.role !== 'admin')
        return res.status(403).json('Not authorized');

    const { name, description } = req.body;
    const topic = {name: name};
    if(description)
        topic.description = description;

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

    const { name, description, picture } = req.body;
    const findQuery = { name: req.params.topicName };

    if(!name && !description && !picture)
        return res.status(400).json('There are missing fields');

    const updatedValues = {};
    if(name)
        updatedValues.name = name;
    if(description)
        updatedValues.description = description;
    if(picture)
        updatedValues.picture = picture;
    // fix picture later

    try{
        const updatedTopic = await Topic.findOneAndUpdate(findQuery, updatedValues, {new: true});
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
        const topic = await Topic.findOneAndDelete({name: topicName});
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