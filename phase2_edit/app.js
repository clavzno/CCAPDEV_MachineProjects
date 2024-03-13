/*
    STILL TEST FILE grr

 Please don't try to move this to a specific folder, keep it here
 there will be future problems with res.sendFile method if so.
*/

const dotenv = require('dotenv').config(); // Load variables stated in .env in as environment variables.
const express = require('express'); // Creating an express server
const sessions = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportlocalmongoose = require('passport-local-mongoose');
const hbs = require('hbs');
const routes = require('./routes/routes'); // Import routes
// const connect = require('./public/database/server.js');
// const controller = require('./controllers/controller');
const flash = require('express-flash');
let app = express(); // app is server object


hbs.registerPartials(__dirname + '/views/partials'); // link hbs with partials
app.set('views', __dirname + '/views'); //specifies where the views directory is
app.set('view engine', 'hbs'); //sets the view engine to hbs


app.use(express.static(__dirname + '/public')); // This allows the user to access the files in public folder: css , frontend js , images and stuff

app.use(express.json());

// Session management
app.use(sessions({
    secret: "StrongSecretThing", // Replace with a strong random secret
    resave: false,
    saveUninitialized: true
  }));

app.use('/', routes); // Use the router for all routes starting with '/'

  // Import all models so far
  require('./models/model');




// Connecting to the Database
const db = require('./public/database/conn'); // Importing database.js
app.listen(db.PORT, async function(){
    console.log("Running on port: " + db.PORT);
    try{
        await db.connectToDb();
        console.log("Connected to MongoDB!");
        console.log("Connected to: " + process.env.MONGODB_URI);
        console.log("Connected to cluster: " + process.env.DB_NAME);
    }catch(err){
        console.error(err);
        console.log("Failed to connect to database");
    }
  });
module.exports = app;