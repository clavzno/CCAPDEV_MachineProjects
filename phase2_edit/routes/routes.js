/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express'); // IMPORTANT! KEEP
const router = express.Router(); // IMPORTANT! KEEP
const authController = require('../controllers/authController'); // Import authController
const feedController = require('../controllers/feedController'); // Import feedController
// const profileController = require('../controllers/profileController'); // Import profileController
const users = require('../models/userModel.js');
const posts = require('../models/postModel.js');

const app = express();

// GETTERS
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/logout', authController.logout);
router.get('/guestFeed', authController.getGuestFeed); // EXPERIMENT

router.get('/feed', feedController.getFeed);
router.get('/profile', feedController.getProfile);



// POSTERS
router.post('/login', authController.login); 
router.post('/signup', authController.signup);
router.post('/createPost', feedController.createPost);

// router.post('/editProfile', profileController.editProfile); //added, will go back later



// router.get('/feed');   //<-- We need something like this after the user is logged in



// router.post('/login', authController.login, (req, res) => {
//     // If login successful (replace with your logic)
//     res.render('login', { message: 'Login successful' }); // Or redirect to another page
//   });
//   router.post('/signup', authController.signup, (req, res) => {
//     // If signup successful (replace with your logic)
//     res.render('signup', { message: 'Signup successful' }); // Or redirect to another page
//   });



//Using routes.js for the testing routes for now

router.get('/', (req, res) => {
    var data ={
        feed: "/feed",
        text: 'yooooo'
    }
    res.render('index', data);
});





// module.exports = app; i dont think we will be exporting 'app' anymore, but let's keep in case
module.exports = router;