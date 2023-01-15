const e = require('express');
const express = require('express');
const router = express.Router();

const dbo = require('./../db/conn');

router.route('/topics').get((req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("topics")
        .find({})
        .toArray((err, result) => {
            if (err){
                res.status(400).send("Error fetching topics");
            }
            else{
                res.json(result);
            }
        });
});

router.route('/topics/:topic').get((req, res) => {
    const dbConnect = dbo.getDb();
    const topicQuery = {topic: req.params.topic};

    dbConnect
        .collection('topics')
        .findOne(topicQuery, (err, result) => {
            if(err){
                res.status(400).send('Error fetching topic');
            }
            else{
                res.json(result);
            }
        });
});

router.route('/topics/create').post((req, res) => {
    const dbConnect = dbo.getDb();
    const topicQuery = {
        topic: req.body.topic,
        desc: req.body.desc,
    };

    dbConnect
        .collection('topics')
        .insertOne(topicQuery, (err, result) => {
            if(err){
                res.status(400).send('Error inserting topic');
            }
            else{
                res.json(result);
            }
        });
});

module.exports = router;