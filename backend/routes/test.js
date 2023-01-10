const express = require('express');
const neo4j_calls = require('./../neo4j/neo4j_api');

const router = express.Router();

router.get('/', async (req, res, next) => {
    res.status(200).send("Root Response from :3000/test");
    return 70000;
});

router.get('/neo4j_get', async (req, res, next) => {
    const result = await neo4j_calls.get_num_nodes();
    console.log("RESULT IS", result);
    res.status(200).send({result});
    return {result};
})

router.post('/neo4j_post', async (req, res, next) => {
    const { name } = req.body;
    const string = await neo4j_calls.create_user(name);
    res.status(200).send("User name " + string + "created");
    return 70000;
})

module.exports = router;