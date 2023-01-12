const {MongoClient} = require("mongodb");
const connection = process.env.MONGO_URI;
console.log(connection);
const client = new MongoClient(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: (callback) => {
        client.connect((err, db) => {
            if (err || !db){
                return callback(err);
            }

            dbConnection = db.db("test");
            console.log("Successfully connected to MongoDB");

            return callback();
        })
    },

    getDb: () => {
        return dbConnection;
    }
}