"use strict";

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const dbo = require('./src/db/conn');

const app = express();
const port = 4000;

app.use(passport.initialize());
require('./src/passport')(passport);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(require('./src/routes/users'));

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.error(err);
    });
    console.log('server is running on port', port);
});