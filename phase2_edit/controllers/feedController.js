/*

  Handles server-side functionality for the feed of Bookface
  logout:       logs the user out

*/

const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");


const feedController = {

    // Logout
    logout(req, res) {
        // As you can see, we have multiple ways of logging out, such as clearing session data or cookies
        // req.session.destroy();                           // Destroy the session
        // res.clearCookie('rememberToken');                // Clear the remember me token cookie
        // res.redirect('/login');                          // Redirect the user to the login page
        console.log('Logout Success!');
        res.clearCookie('rememberToken').redirect('/login'); // Let's try this for now
      }




};

module.exports = feedController;