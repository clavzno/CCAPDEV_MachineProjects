// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel'); // Assuming userModel.js is in ../models

// // Login route (GET request for login form)
// router.get('/login', (req, res) => {
//   res.render('login'); // Assuming you have a views folder with login.ejs (or another templating engine)
// });

// // Login route (POST request for form submission)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email }); // Find user by email

//     if (!user) {
//       return res.status(401).send('Invalid email or password'); // Error: User not found
//     }

//     // Validate password (replace with your actual password hashing logic)
//     const isMatch = password === user.password; // Placeholder, replace with bcrypt comparison

//     if (!isMatch) {
//       return res.status(401).send('Invalid email or password'); // Error: Password mismatch
//     }

//     // Login successful (replace with session management or JWT token generation)
//     res.send('Login successful'); // Replace with appropriate response for successful login
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error'); // Internal server error
//   }
// });

// // Signup route (GET request for signup form)
// router.get('/signup', (req, res) => {
//   res.render('signup'); // Assuming you have a views folder with signup.ejs
// });

// // Signup route (POST request for form submission)
// router.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, password, birthdate, gender } = req.body;

//   try {
//     const existingUser = await User.findOne({ email }); // Check for existing email

//     if (existingUser) {
//       return res.status(400).send('Email already exists'); // Error: Duplicate email
//     }

//     // Create a new user instance
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password, // Replace with hashed password before saving
//       birthdate,
//       gender,
//     });

//     await newUser.save(); // Save the new user to the database

//     res.send('Signup successful'); // Replace with appropriate response for successful signup
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error'); // Internal server error
//   }
// });

// module.exports = router;