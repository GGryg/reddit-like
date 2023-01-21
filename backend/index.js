const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config({path: '.env'});

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(cookieParser());

const users = require('./src/routes/users');
const auth = require('./src/routes/auth');
const topics = require('./src/routes/topics');
const posts = require('./src/routes/posts');

app.use('/api/users', users);
app.use('/api/', auth);
app.use('/api/topics', topics);
app.use('/api/posts', posts);

const connectDB = async () =>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected to MongoDB');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port', PORT);
});