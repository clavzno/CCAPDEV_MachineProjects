// Database.js module turned conn.js from copying sir lol
const { MongoClient } = require('mongodb') // importing MongoDB client
const dotenv = require('dotenv').config();

// const port = process.env.PORT || 3000;
const port = 3000;
// const port = process.env.PORT;
// const mongoURI = 'mongodb+srv://admin:adminpassword@ccapdev-s19-g12.ybpesmo.mongodb.net/?retryWrites=true&w=majority&appName=ccapdev-s19-g12';
const mongoURI = 'mongodb+srv://admin:adminpassword@ccapdev-s19-g12.ybpesmo.mongodb.net/';
// const mongoURI = process.env.MONGODB_URI;
// const db_name = process.env.DB_NAME;
const db_name = 'ccapdev-s19-g12';

const client = new MongoClient(mongoURI);

// Establishes initial connection to  the mongodb process
const connectToDb = (callback) =>{
    client.connect((err,client) => {
        if(err || !client) {
            return callback(err);
        }
        return callback();
    })
}

// Returns instance of database with a name defined in .env
const getDb = () => {
    return client.db(db_name);
}


// Honestly I do not know the purpose yet
function signalHandler() {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}
process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);

// Exporting module
module.exports = {
    connectToDb : connectToDb,
    getDb : getDb,
    PORT : port,
    URI : mongoURI
}