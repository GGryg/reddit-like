"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const users = require('./routes/users');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', users);

app.listen(port, () => {
    console.log('server is running on port', port);
})