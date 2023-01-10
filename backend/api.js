const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const test = require('./routes/test');

app.get('/dummy', (req, res) => {
    res.send('Response from Route of the express');
})

app.use((req, res, next) => {
    res.header('Access-Control=Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/test', test);

app.listen(port, () => {
    console.log('Server running on port ', port)
})