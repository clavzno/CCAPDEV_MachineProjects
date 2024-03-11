const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const User = require('../models/userModel'); // Import the User model
const bcrypt = require('bcrypt'); // For password hashing


const authController = {

  getSignup: function(req, res){
    res.render('signup');
  },

    // Function to handle user signup
    signup: async (req, res) => {
    // Extract user data from request body
    const { firstName, lastName, email, password, birthdate, gender } = req.body;

    // Check for existing user with the same email
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Hash the password before saving the user
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with hashed password
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        birthdate,
        gender,
      });

      await newUser.save(); // Save the user to the database

      // Send success response or redirect to login page (optional)
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  // Render the login template
  getLogin: function(req, res){
    res.render('login');
  },



// Function to handle user login
  login: async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare hashed password with provided password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Login successful (implementation depends on your authentication strategy)
      // You might create a session, generate a token, or redirect to a protected page

      res.status(200).json({ message: 'Login successful' }); // Replace with your logic
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = authController;