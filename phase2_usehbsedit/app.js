/*
    STILL TEST FILE grr

 Please don't try to move this to a specific folder, keep it here
 there will be future problems with res.sendFile method if so.
*/

const dotenv = require('dotenv').config(); // Load variables stated in .env in as environment variables.
const express = require('express'); // Creating an express server
const sessions = require('express-session');
const mongoose = require('mongoose');
const hbs = require('hbs');
const routes = require('./routes/routes');
// const connect = require('./public/database/server.js');


const app = express(); // app is server object
hbs.registerPartials(__dirname + '/views/partials'); // link hbs with partials

app.set('views', __dirname + '/views'); //specifies where the views directory is
app.set('view engine', 'hbs'); //sets the view engine to hbs


app.use(express.static(__dirname+ '/public')); // This allows the user to access the files in public folder: css , frontend js , images and stuff
// ^^ THERE IS A PROBLEM DAWG
app.use(express.json());
app.use('/', routes);

const db = require('./public/database/conn'); // Importing database.js
db.connectToDb(() => {
    console.log('Connected to MongoDB');
});
app.listen(db.PORT); // listening to port 3000 as it is stated in MCO2 specs

var feedRouter = require('./views/feed'); // creating a router to feed

app.use('/feed', feedRouter); // making /feed associated with feed content

//Only a test route, definitely modify/remove if needed
app.get('/', (req, res) => {
    res.render('index', { text: 'yooooooo' });
});

// Getting request listening in /home
// app.get('/login' , (req, res) => {
//     console.log("Request has been received for: " + req.url);
//     // res.send("html/login.html"); <- Use if this includes html code
//     res.sendFile(__dirname + "/views/login.html"); // Filepath but Express treats it ABSOLUTE , use __dirname +
// });
// Getting request listening in /profile
// app.get('/profile/:username' , (req, res) => {
//     console.log("Request has been received for: " + req.url);
//     res.send(`
//     <!DOCTYPE html>
//     <html>
//         <head>
//             <title>ProfilePageTEST</title>
//         </head>
//         <body>
//             <h1>apdev kills me, though my name is ${req.params.username} ..</h1>
//         </body>
//     </html>
//     `);

// });


// Console testing
// app.get('/users/:userId/books/:bookId' , (req, res) => {
//     console.log("Request Received for /users/../books/");
//     console.log(req.params);
//     res.sendStatus(200);
// });

module.exports = app;