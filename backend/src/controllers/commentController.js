const Comment = require('../models/CommentSchema');

const getComments = async (req, res) => {
    const { sort, filter } = req.query;
    const sortQuery = sort || {};
    const filterQuery = filter || {};

    try{
        const comments = await Comment.find(filterQuery).sort(sortQuery);

        return res.status(200).json(comments);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const getComment = async (req, res) => {
    const { id } = req.params;

    try{
        const comment = await Comment.findById(id);
        if(!comment)
            return res.status(404).json('comments not found');

        return res.status(200).json(comment);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const getCurrentComments = async (req, res) => {
    const { id } = req.user;

    try{
        const comment = await Comment.find({user: id});
        if(!comment)
            return res.status(404).json('Comment not found');

        return res.status(200).json(comment);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const createComment = async (req, res) => {
    const { id } = req.user;
    const { postId, content, links } = req.body;
    
    if(!postId && !content)
        return res.status(400).json('There are missing fields');

    const comment = {post: postId, content: content, user: id};
    if(links)
        comment.links = links;

    try{
        const newComment = new Comment(comment);
        await newComment.save();

        return res.status(201).json('Added a new comment');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const updateComment = async (req, res) => {
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        if(!comment)
            return res.status(404).json('Comment not found');
        if(comment.user.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'moderator')
            return res.status(403).json('Not authorized')
        
        const { content, links } = req.body;

        if(!content && !links)
            return res.status(400).json('There are missing fields');
        
        const updatedValues = {};
        if(content)
            updatedValues.content = content;
        if(links)
            updatedValues.links = links;

        const updatedComment = await Comment.findByIdAndUpdate(id, updatedValues, {new: true});
        if(!updatedcomments)
            return res.status(404).json('comments not found');
        
        return res.status(200).json(updatedComment);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;

    try{
        const comment = await Comment.findById(id);
        if(!comment)
            return res.status(404).json('Comment not found');
        if(comment.user.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'moderator')
            return res.status(403).json('Not authorized')

        await Comment.findByIdAndDelete(id);
        return res.status(200).json('Comment has been deleted');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

module.exports = {
    getComments,
    getComment,
    getCurrentComments,
    createComment,
    updateComment,
    deleteComment,
};