const Post = require('../models/PostSchema');

const getPosts = async (req, res) => {
    const { sort, filter } = req.query;
    const sortQuery = sort || {};
    const filterQuery = filter || {};
    console.log(filter);

    try{
        const posts = await Post.find(filterQuery).sort(sortQuery);
        return res.status(200).json(posts);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const getPost = async (req, res) => {
    const { id } = req.params;

    try{
        const post = await Post.findById(id);
        if(!post)
            return res.status(404).json('Post not found');

        return res.status(200).json(post);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const createPost = async (req, res) => {
    const { id } = req.user;
    const { title, content, links, topic } = req.body;
    const picture = req.file?.filename;
    console.log(req.headers);

    if(!title)
        return res.status(400).json('There is missing field');

    const post = {title: title, user: id, topic: topic};
    if(content)
        post.content = content;
    if(links)
        post.links = links;
    if(picture)
        post.picture = picture;

    try{
        const newPost = new Post(post);
        await newPost.save();

        return res.status(201).json(newPost);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    try{
        const post = await Post.findById(id);
        if(!post)
            return res.status(404).json('Post not found');
        if(post.user.toString() !== req.user.id || req.user.role !== 'admin' || req.user.role !== 'moderator')
            return res.status(403).json('Not authorized')
        
        const { title, content, links } = req.body;
        const picture = req.file.filename;

        if(!title && !content && !links && !picture)
            return res.status(400).json('There are missing fields');
        
        const updatedValues = {};
        if(title)
            updatedValues.title = title;
        if(content)
            updatedValues.content = content;
        if(links)
            updatedValues.links = links;
        if(picture)
            updatedValues.picture = picture;

        const updatedPost = await Post.findByIdAndUpdate(id, updatedValues, {new: true});
        if(!updatedPost)
            return res.status(404).json('Post not found');
        
        return res.status(200).json(updatedPost);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;

    try{
        const post = await Post.findById(id);
        if(!post)
            return res.status(404).json('Post not found');
        if(post.user.toString() !== req.user.id || req.user.role !== 'admin' || req.user.role !== 'moderator')
            return res.status(403).json('Not authorized')

        await Post.findByIdAndDelete(id);
        return res.status(200).json('Post has been deleted');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const searchPost = async (req, res) => {
    const { search } = req.query;
    console.log(search);
    const filters = search ? {$or: [{title: {$regex: `.*${search}.*`, $options: "i"}}, {content: {$regex: `.*${search}.*`, $options: "i"}}]} : {_id: null};
    try{
        const posts = await Post.find(filters);
        res.json(posts);
    }
    catch(err){
        console.error(err);
        return res.status(500).json('error');
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    searchPost,
};