// Database.js module turned conn.js from copying sir lol
const { MongoClient } = require('mongodb') // importing MongoDB client
const dotenv = require('dotenv').config();

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;
const db_name = process.env.DB_NAME;
const client = new MongoClient(mongoURI);

// Establishes initial connection to  the mongodb process
// const connectToDb = (callback) =>{
//     client.connect((err,client) => {
//         if(err || !client) {
//             return callback(err);
//         }
//         return callback();
//     })
// }

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
    connect : connect,
    getDb : getDb,
    PORT : port,
    URI : mongoURI
}