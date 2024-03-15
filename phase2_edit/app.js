/*
    STILL TEST FILE grr

 Please don't try to move this to a specific folder, keep it here
 there will be future problems with res.sendFile method if so.
*/

const dotenv = require('dotenv').config(); // Load variables stated in .env in as environment variables.
const express = require('express'); // Creating an express server
const sessions = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportlocalmongoose = require('passport-local-mongoose');
const hbs = require('hbs');
const routes = require('./routes/routes'); // Import routes
const feed = require('./routes/feed');
const flash = require('express-flash');
let app = express(); // app is server object

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Session management that we dont need for MCO2 but im keeping it because its not destroying our code :)
app.use(sessions({
    secret: "StrongSecretThing", // Replace with a strong random secret
    resave: false,
    saveUninitialized: true
  }));

app.use(cookieParser());
hbs.registerPartials(__dirname + '/views/partials'); // link hbs with partials
app.set('views', __dirname + '/views'); //specifies where the views directory is
app.set('view engine', 'hbs'); //sets the view engine to hbs


app.use(express.static(__dirname + '/public')); // This allows the user to access the files in public folder: css , frontend js , images and stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes); // Use the router for all routes starting with '/'
app.use('/feed', feed); // Use the feed router for all feed routes


const port = process.env.PORT;
const uri = process.env.MONGODB_URI
const cluster = process.env.DB_NAME;

// Arguably the most important part of app.js 
// THEREFORE DO NOT TOUCH THIS PART OF THE FILE
const connect = require('./models/database/server');
app.listen(process.env.PORT, async function(){
  console.log("Running on port: " + process.env.PORT);
  try{
      await connect();
      console.log("Connected to " + process.env.MONGODB_URI)
      console.log("Cluster is named: " + process.env.DB_NAME);
  }catch(err){
      console.error(err);
      console.log("Failed to connect to database");
  }
});