/*

    MAIN FILE !
    Where all the magic functions

    I miss her so much man, but I got ghosted

*/

const dotenv = require('dotenv').config(); // Load variables stated in .env in as environment variables.
const mongoose = require('mongoose');
const express = require('express'); // Creating an express server
const sessions = require('express-session'); // store data server side unlike cookies
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportlocalmongoose = require('passport-local-mongoose');
const cookieParser = require("cookie-parser"); // will allow website to become stateful, stores pieces of data client side
const bodyParser = require('body-parser');
const hbs = require('hbs');
const routes = require('./routes/routes'); // Import routes
const flash = require('express-flash');
let app = express(); // app is server object

app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Session management that we probably need for MCO3, im working on it :)
app.use(sessions({
    secret: "StrongSecretThing",  // used to sign the session ID cookie.
    resave: false,                // forces session to be saved back to the session store if not modified
    saveUninitialized: true,      // forces a session that isnt uninitialized to be saved to the store
    cookie: {                     // cookie properties set over here
      maxAge:1000*60*60*24*30,
      httpOnly:true
    }
  }));

// Cookies and Cream
app.get('/check-cookie', (req,res) => {
  let cookiefoo = req.cookies.foo
  if(cookiefoo){
    console.log("foo: " + cookiefoo)
  }  res.send('Cookie checked');
})




hbs.registerPartials(__dirname + '/views/partials'); // link hbs with partials
app.set('view engine', 'hbs'); //sets the view engine to hbs
app.set('views', __dirname + '/views'); //specifies where the views directory is



app.use(express.static(__dirname + '/public')); // This allows the user to access the files in public folder: css , frontend js , images and stuff
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes); // Use the router for all routes starting with '/'
//app.use('/feed', feed); // Use the feed router for all feed routes

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