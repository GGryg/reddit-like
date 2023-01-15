const express = require('express');
const router = express.Router();

const dbo = require('./../db/conn');

router.route('/posts').get(async (req, res) => {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("posts")
        .find({})
        .toArray((err, result) => {
            if (err){
                res.status(400).send("Error fetching posts");
            }
            else{
                res.json(result);
            }
        });
});

module.exports = router;