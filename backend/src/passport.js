const passport = require('passport');
const dbo = require('./db/conn');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (payload, done) => {
        const dbConnect = dbo.getDb();
        dbConnect
            .collection('users')
            .findById(payload.id)
            .then(user => {
                if (user){
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.error(err));
    }));
};