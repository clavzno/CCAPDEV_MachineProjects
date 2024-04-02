/*

    MAIN FILE !
    Where all the magic functions

    I miss her so much man, but I got ghosted

*/

const dotenv = require('dotenv').config();            // Load variables stated in .env in as environment variables.
const mongoose = require('mongoose');
const express = require('express');                   // Creating an express server
const session = require('express-session');           // store data server side unlike cookies
const store = new session.MemoryStore();              // Session Module has a class called "MemoryStore"
const cookieParser = require("cookie-parser");        // will allow website to become stateful, stores pieces of data client side
const bodyParser = require('body-parser');            // Middleware from Express.js that handles HTTP POST requests
const hbs = require('hbs');                           // Requires handlebars because handlebars handlebars handlebars
const routes = require('./routes/routes');            // Import routes file that uhhhhh has all the routing for controller files
const connect = require('./models/database/server');  // Importing the file that connects to the server
let app = express(); // app is server object

// Session management that we probably need for MCO3, im working on it :)
app.use(session({
  secret: "StrongSecretThing",  // used to sign the session ID cookie.
  resave: false,                // forces session to be saved back to the session store if not modified
  saveUninitialized: false,     // forces a session that isnt uninitialized to be saved to the store, !!! FALSE because we have login system
  cookie: {                     // cookie properties set over here
    maxAge:1000 * 60 * 60 * 24 * 7 * 3,
    httpOnly:true
  },
  store
}));

// EXPERIMENTAL - 
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  next();
})



// Cookie Parsing
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies



// Setting the view engine to handlebars instead of HTML
hbs.registerPartials(__dirname + '/views/partials'); // link hbs with partials
app.set('view engine', 'hbs'); //sets the view engine to hbs
app.set('views', __dirname + '/views'); //specifies where the views directory is


// We need to detect folders/files inside `public` folder, code below does that for us
app.use(express.static(__dirname + '/public')); // This allows the user to access the files in public folder: css , frontend js , images and stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes); // Use the router for all routes starting with '/'
//app.use('/feed', feed); // Use the feed router for all feed routes



// Arguably the most important part of app.js 
// THEREFORE DO NOT TOUCH THIS PART OF THE FILE
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