// for authentication for signup and login

const mongoose = require('mongoose');
const User = require('../models/userModel.js'); // Import the User model
const bcrypt = require('bcrypt'); // For password hashing
const session = require('express-session'); // To remember user that logged in

const remMe = (1000 * 60 * 60 * 24) * 21; // NOT YET IMPLEMENTED , For the Remember Me option

const authController = {

  // Render the signup page
  getSignup: (req, res) => {
    res.render('signup');
  },

 // Handle user signup
 async signup(req, res) {
  console.log(req.body); 
  const { firstName, lastName, email, password, confirmPassword, birthdate, gender } = req.body;

  try {
    // Check for existing user with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already exists' });
    }
        // Check if passwords match
        if (password !== confirmPassword) {
          console.log('Passwords do not match'); 
          return res.status(400).json({ message: 'Passwords do not match' });
        }

    // Hash the password before saving the user
    const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
      birthdate,
      gender,
    });

    await newUser.save(); // Save the user to the database

    // Send success response or redirect to a confirmation page (optional)
    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
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
  console.log(req.body); 
  const { email, password } = req.body;
  const rememberMe = req.body.rememberMeLogin;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid email:', email);
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Compare hashed password with provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid password' });
    }

  // NOT YET IMPLEMENTED
    if(rememberMe) {
      session = req.session;
      session.email = req.body.user;
  }

    // Login successful (implementation depends on your authentication strategy)
    // You might create a session, generate a token, or redirect to a protected page
    // In this example, we'll redirect to a placeholder page (replace with your logic)
    res.redirect('/feed'); // Replace with your desired redirect path
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}
};

module.exports = authController;