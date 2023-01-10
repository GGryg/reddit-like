"use strict";

const express = require('express');

const neo4jc = require('./../neo4j/neo4j_api');

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).send('Root response from: 4000/users');
    return 700000;
});

router.get('/get_amount', async (req, res) => {
    const ret = await neo4jc.get_num_users();
    console.log('Number of users: ', ret);
    res.status(200).send({ ret });
    return { ret };
});

router.post('/check_email', async (req, res) => {
    const { email } = req.body;
    const string = await neo4jc.check_if_email_exists(email);
    res.status(200).send("Email exists: ", string);
    return 700000;
});

router.post('/check_username', async (req, res) => {
    const { username } = req.body;
    const string = await neo4jc.check_if_username_exists(username);
    res.status(200).send("Username exists: " + string);
    return 70000;
})

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    const string = await neo4jc.create_user(email, username, password);
    res.status(200).send("User: " + string + " created");
    return 700000;
});

router.delete('/delete', async (req, res) => {
    const { username } = req.body;
    await neo4jc.delete_user(username);
    res.status(200).send("User deleted");
    return 700000;
})

module.exports = router;