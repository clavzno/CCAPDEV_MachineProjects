/*
    If you're wondering, where did conn.js go?
    I removed it, it had no purpose.

    Thank you,
    Yazan

*/ 
const mongoose = require('mongoose');

async function connect(){
    return await mongoose.connect(process.env.MONGODB_URI, {dbName: process.env.DB_NAME});
};

module.exports = connect;