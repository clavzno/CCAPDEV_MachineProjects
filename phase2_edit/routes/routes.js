/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import authController

const app = express();
// app.get('/', authController.login);  // Idk wat to expect
app.get('/login', authController.getLogin);
app.get('/signup', authController.getSignup);

app.post('/login', authController.login); 
app.post('/signup', authController.signup);

// router.post('/login', authController.login, (req, res) => {
//     // If login successful (replace with your logic)
//     res.render('login', { message: 'Login successful' }); // Or redirect to another page
//   });
//   router.post('/signup', authController.signup, (req, res) => {
//     // If signup successful (replace with your logic)
//     res.render('signup', { message: 'Signup successful' }); // Or redirect to another page
//   });






module.exports = app;