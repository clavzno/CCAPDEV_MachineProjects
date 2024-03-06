/*
    STILL TEST FILE grr

 Please don't try to move this to a specific folder, keep it here
 there will be future problems with res.sendFile method if so.
*/

const express = require('express'); // Creating an express server
const app = express(); // app is server object

app.listen(3000); // listening to port 3000 as it is stated in MCO2 specs

app.use(express.static('public')); // This allows the user to access the files in public folder: css , frontend js , images and stuff


// Getting request listening in /home
app.get('/login' , (req, res) => {
    console.log("Request has been received for: " + req.url);
    // res.send("html/login.html"); <- Use if this includes html code
    res.sendFile(__dirname + "/view/login.html"); // Filepath but Express treats it ABSOLUTE , use __dirname +
});
// Getting request listening in /profile
app.get('/profile/:username' , (req, res) => {
    console.log("Request has been received for: " + req.url);
    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>ProfilePageTEST</title>
        </head>
        <body>
            <h1>apdev kills me, though my name is ${req.params.username} ..</h1>
        </body>
    </html>
    `);

});


// Console testing
app.get('/users/:userId/books/:bookId' , (req, res) => {
    console.log("Request Received for /users/../books/");
    console.log(req.params);
    res.sendStatus(200);
});