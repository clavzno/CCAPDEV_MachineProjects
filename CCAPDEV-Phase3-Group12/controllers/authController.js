/*

  Handles server-side functionality for the authentication of user
  getSignup:  renders signup page
  signup:     handles registration functionality
  getLogin:   renders login page
  login:      handles ... logging in..

*/

const mongoose = require('mongoose');
const express = require('express'); // Creating an express server
const session = require('express-session'); // store data server side unlike cookies
const User = require('../models/userModel.js'); // Import the User model
const Post = require('../models/postModel.js'); // Import the Post model
const bcrypt = require('bcrypt'); // For password hashing
const crypto = require('crypto'); // For the remember me option


const remMe = 1000 * 60 * 60 * 24 * 7 * 3; // 3 weeks in milliseconds

const authController = {

  // Render the signup page
  getSignup: (req, res) => {
    res.render('signup');
  },

 // Handle user signup
 async signup(req, res) {
  console.log(req.body); 
  const { firstName, lastName, username, password, confirmPassword, birthdate, gender } = req.body;

  try {
    // Check for existing user with the same username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('username already exists:', username);
      console.log('Redirecting back to signup page because user already exists');
      return res.redirect('/signup?error=usernameExists');
    }
        // Check if passwords match
        if (password !== confirmPassword) {
          console.log('Passwords do not match'); 
          console.log('Redirecting back to signup page because passwords do not match');
          return res.redirect('/signup?error=passwordsDoNotMatch');
        }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword, // Store hashed password
      birthdate,
      gender,
    });

    await newUser.save(); // Save the user to the database

    // Send success response or redirect to a confirmation page (optional)
    console.log('User created successfully');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
},

  // Render the login page
  getLogin: (req, res) => {
    res.render('login');
  },



 // Handle user login
 async login(req, res) {
  const { username, password, rememberMe } = req.body;
  // const rememberMe = req.body.rememberMeLogin;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('Invalid username:', username);
      return res.redirect('/login?error=invalidUsername'); // changed according to sir's comment
    }

    // Compare hashed password with provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password');
      return res.redirect('/login?error=invalidPassword'); // changed according to sir's comment
    }
    // Working on the Session Management:
    console.log("Login Details: ",req.body);
    req.session.userId = user._id;
    console.log("Request Session: ",req.session);

  // EXPERIMENTAL !!! ( Does not destroy code anyways, making use of crypto )
  if (rememberMe) {
    const token = crypto.randomBytes(64).toString('hex'); // Generates a secure token
    user.rememberMe = token; // Saves the token in the user document
    await user.save(); // Saves the user document
    res.cookie('rememberMe', token, { maxAge: remMe }); // Sets a cookie that lasts for 3 weeks
  }

    // Login successful
    // Might create a session, generate a token, or redirect to another page
    // In this, we'll redirect to feed page
    res.redirect('/feed');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message }); // Providing more specific error message, just a minor change
  }
},

    // Logout
    logout(req, res) {
      // As you can see, we have multiple ways of logging out, such as clearing session data or cookies
      // res.clearCookie('rememberToken');                // Clear the remember me token cookie
      // res.redirect('/login');                          // Redirect the user to the login page
      req.session.destroy();                              // Destroy the session
      console.log('Logout Success!');
      res.clearCookie('rememberToken').redirect('/login'); // Let's try this for now
    },

    // Render the feed page for guests
  getGuestFeed: async (req, res) => {
    try {    
      const posts = await Post.find()
                              .sort({ postDate: -1 })
                              .limit(20)
                              .populate('user', 'username user_img'); // Fetch the 15-20 most recent posts
      
      // Render the posts on the feed page
      res.render('guestFeed', { posts });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = authController;