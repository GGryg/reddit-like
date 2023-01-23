const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json('No token');

    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err)
            return res.status(401).json('Invalid token');
        else{
            req.user = decoded;
            return next();
        }
    });
};

module.exports = checkAuth;