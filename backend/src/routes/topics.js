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

module.exports = router;