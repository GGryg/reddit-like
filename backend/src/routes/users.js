const e = require('express');
const express = require('express');

const router = express.Router();
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
    const userQuery = {user_id: parseInt(req.params.id)};

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
    const matchDocument = {
        user_id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    dbConnect
        .collection("users")
        .insertOne(matchDocument, (err, result) => {
            if(err){
                res.status(400).send("Error inserting");
            }
            else{
                console.log('Added a new user id', result.insertedId);
                res.status(204).send();
            }
        });
});

router.route('/users/update/:id').post(async (req, res) => {
    const dbConnect = dbo.getDb();
    const userQuery = {user_id: parseInt(req.params.id)};
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
    const userQuery = {user_id: parseInt(req.params.id)};

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

module.exports = router;