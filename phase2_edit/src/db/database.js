// Database.js module
const { MongoClient } = require('mongodb') // importing MongoDB client

const PORT = process.env.PORT ?? 3000;
const mongoURI = 'mongodb+srv://admin:adminpassword@ccapdev-s19-g12.ybpesmo.mongodb.net/?retryWrites=true&w=majority&appName=ccapdev-s19-g12';

const client = new MongoClient(mongoURI);

const connect = (callback) => {
    client.connect().then(() => {
        callback();
    }).catch(err => {
        console.error(err);
    });
};

const getDb = (dbName) => {
    return client.db(dbName);
}

// Exporting module
module.exports = {
    connectToDb : connect,
    getDb  :getDb,
    PORT : PORT,
    URI : mongoURI
}

function signalHandler() {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}
process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);
