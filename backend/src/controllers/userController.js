const bcrypt = require('bcryptjs');
const User = require('./../models/UserSchema');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, username, password } = req.body;
    if(!email || !username || !password)
        return res.status(400).json('There are missing fields');
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            username: username,
            password: hashPass,
        });

        await newUser.save();
        return res.status(201).json('Added new user');
    }
    catch (err) {
        console.log(err);
        return res.json('Error with adding a new user');
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password )
        return res.status(400).json('There are missing fields');

    try{
        const user = await User
            .findOne({username: username})
            .select('username password role');
        
        if(!user)
            return res.status(404).json('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(401).json('Password is incorrect');
        
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '7d'});

        return res.cookie('token', token, {httpOnly: true}).status(200).json({success: true});        
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('Error');
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json('Logged out successfully');
};

const getUsers = async (req, res) => {
    const { sort, filter } = req.query;
    const sortQuery = sort || {};
    const filterQuery = filter || {};

    try{
        const users = await User.find(filterQuery).sort(sortQuery);

        return res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const getUser = async (req, res) => {
    const { username } = req.params;
    const userQuery = { username: username };

    try{
        let user;
        if(req.user.role !== 'admin' || req.user.role !== 'moderator')
            user = await User.findOne(userQuery).select('email username description avatar role');
        else
            user = await User.findOne(userQuery);

        if (!user)
            return res.status(404).json('User not found');

        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const getCurrentUser = async (req, res) => {
    const { user } = req;

    try{
        const userInfo = await User.findById(user.id).select('email username description avatar role');
        
        if(!userInfo)
            return res.status(404).json('User not found');

        return res.status(200).json(userInfo);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error')
    }
};

const updateUser = async (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(403).json('Not authorized');
    
    const updatedValues = {};
    const { email, avatar, description, role } = req.body;

    if(!email && !avatar && !description && !role)
        return res.status(400).json('There are missing fields');

    const findQuery = { username: req.params.username };
    if (email)
        updatedValues.email = email;
    if (description)
        updatedValues.description = description;
    if (role)
        updatedValues.role = role;
    if (avatar)
        updatedValues.avatar = avatar;
    // fix avatar later

    try{
        const updatedUser = await User.findOneAndUpdate(findQuery, updatedValues, {new: true});
        if (!updatedUser)
            return res.status(400).json('User not found');
        
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const updateCurrentUser = async (req, res) => {
    const { user } = req;
    const { email, description, avatar } = req.body;

    if (!email && !description && !avatar)
        return res.status(400).json('There are missing fields');

    const updatedValues = {};
    if (email)
        updatedValues.email = email;
    if (description)
        updatedValues.description = description;
    if (avatar)
        updatedValues.avatar = avatar;
    // fix avatar later

    try{
        const updatedUser = await User.findByIdAndUpdate(user.id, updatedValues, {new: true}).select('email username description role avatar');
    
        if(!updatedUser)
            return res.status(404).json('User not found');
    
        return res.status(200).json(updatedUser);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('Error');
    }
};

const changePassword = async (req, res) => {
    const { user } = req;
    const { password } = req.body;

    if(!password)
        return res.status(400).json('There is missing field');
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const updatedUser = await User.findByIdAndUpdate(user.id, {password: hashPass}, {new: true});
        return res.status(201).json(updatedUser);
    }
    catch (err) {
        console.log(err);
        return res.json('Error with adding a new user');
    }
};

const deleteCurrentUser = async(req, res) => {  
    const { id } = req.user;
    console.log(id);

    try{
        const user = await User.findByIdAndDelete(id);
        if(!user)
            return res.status(404).json('User not found');
        
        res.clearCookie('token');
        return res.status(200).json('User has been deleted');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

const deleteUser = async (req, res) => {
    if (req.user.role !== 'admin')
        return res.status(403).json('Not authorized');
    
    const { username } = req.params;
    const findQuery = { username: username }

    try{
        const user = await User.findOneAndDelete(findQuery);
        if(!user)
            return res.status(404).json('User not found');
        
        return res.status(200).json('User has been deleted');
    }
    catch (err) {
        console.error(err);
        return res.status(500).json('error');
    }
};

module.exports = {
    register,
    login,
    logout,
    getUsers,
    getUser,
    getCurrentUser,
    updateCurrentUser,
    updateUser,
    changePassword,
    deleteCurrentUser,
    deleteUser,
};