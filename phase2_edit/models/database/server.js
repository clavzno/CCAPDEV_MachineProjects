const mongoose = require('mongoose');
const { MongoClient } = require('mongodb') 
const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

async function connect(){
    return await mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME});
};

function signalHandler() {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
};
process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

module.exports = connect;