/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import authController
const schemas = require('../models/userModel.js');

const app = express();
// app.get('/', authController.login);  // Idk wat to expect
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

router.post('/login', authController.login); 
router.post('/signup', authController.signup);

// router.post('/login', authController.login, (req, res) => {
//     // If login successful (replace with your logic)
//     res.render('login', { message: 'Login successful' }); // Or redirect to another page
//   });
//   router.post('/signup', authController.signup, (req, res) => {
//     // If signup successful (replace with your logic)
//     res.render('signup', { message: 'Signup successful' }); // Or redirect to another page
//   });



//Using routes.js for the testing routes for now

// router.get('/', (req, res) => {
//     var data ={
//         feed: "/feed",
//         text: 'yooooo'
//     }
//     res.render('index', data);
// });

// router.get('/feed', (req, res) => {
//     var data ={
//         test: 'nooo'
//     }
//     res.render('feed', data);
// });



// module.exports = app;
module.exports = router;