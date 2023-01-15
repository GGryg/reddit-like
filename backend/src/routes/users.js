const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const dbo = require('./../db/conn');

router.route('/users').get(async (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("users")
        .find({})
        .toArray((err, result) => {
            if (err){
                res.status(400).send("Error fetching user");
            }
            else{
                res.json(result);
            }
        });
});

router.route('/users/:id').get(async (req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {user_id: req.params.id};

    dbConnect
        .collection('users')
        .findOne(userQuery, (err, result) => {
            if (err){
                res.status(400).send('Error fetching user');
            }
            else{
                res.json(result);
            }
        });
});

router.route('/users/register').post(async (req, res) => {
    const dbConnect = dbo.getDb();
    let userQuery = {
        user_id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    try{
        await bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error(err);
        else{
            bcrypt.hash(userQuery.password, salt, (err, hash) => {
                if(err) console.error(err);
                else{
                    userQuery.password = hash;
                    dbConnect
                    .collection("users")
                    .insertOne(userQuery, (err, result) => {
                        if(err){
                            res.status(400).send("Error inserting");
                        }
                        else{
                            console.log('Added a new user id', result.insertedId);
                            res.status(204).send();
                        }
                    });
                }
            });
        }
        });
    }
    catch(err){
        console.error(err);
    }

});

router.route('/users/login').post(async (req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {
        username: req.body.username,
    };

    dbConnect
        .collection('users')
        .findOne(userQuery)
        .then(user => {
            if(!user) return res.status(400).json('User not found');
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            user_id: user.user_id,
                            username: user.username,
                        };
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error(err);
                            else{
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                });
                            }
                        });
                    }
                    else{
                        return res.status(400).json('Incorrect Password');
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.json({
        user_id: req.user.user_id,
        username: req.user.username,
        email: req.user.email,
    });
});

router.route('/users/update/:id').post(async (req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {user_id: req.params.id};
    const updated = {
        $set: {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        },
    };

    dbConnect
        .collection('users')
        .updateOne(userQuery, updated, (err, result) => {
            if (err){
                res.status(400).send('Error updating user');
            }
            else{
                console.log('Updated 1 user');
                res.json(result);
            }
        })
})

router.route('/users/delete/:id').delete((req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {user_id: req.params.id};

    dbConnect
        .collection("users")
        .deleteOne(userQuery, (err, result) => {
            if (err){
                res.status(400).send('Error deleting user with id', userQuery.user_id);
            }
            else{
                console.log('Deleted 1 document');
                res.json(result);
            }
        });
});

router.route('/users/email/:email').get((req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {email: req.params.email};

    dbConnect
        .collection("users")
        .findOne(userQuery, (err, result) => {
            if(err){
                res.status(400).send('Error fetching email');
            }
            else{
                if(result) return res.json(true);
                else return res.json(false);
            }
        });
});

router.route('/users/name/:username').get((req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {username: req.params.username};

    dbConnect
        .collection("users")
        .findOne(userQuery, (err, result) => {
            if(err){
                req.status(400).send('Error fetching username');
            }
            else{
                if(result) return res.json(true);
                return res.json(false);
            }
        });
});

module.exports = router;