/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express'); // IMPORTANT! KEEP
const router = express.Router(); // IMPORTANT! KEEP
const mainController = require('../controllers/mainController'); // Import mainController
const authController = require('../controllers/authController'); // Import authController
const feedController = require('../controllers/feedController'); // Import feedController
// const profileController = require('../controllers/profileController'); // Import profileController
const users = require('../models/userModel.js');
const posts = require('../models/postModel.js');

// =================================================================
// GETTERS
// Changed default route from 'index.hbs' to 'login.hbs'
router.get('/', (req, res) => {
    console.log("REQUEST URL: " + req.url);
    res.render('login')
});
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/logout', authController.logout);

router.post('/login', authController.login); 
router.post('/signup', authController.signup);
//router.post('/createPost', feedController.createPost);

router.get('/profile', feedController.getProfile);
router.get('/feed', feedController.loadFeed); 
router.post('/feed', feedController.feedPost);
router.get('/feed/:id', feedController.loadPost); 
router.post('/feed/:id', feedController.postComment);
router.get('/feed/:id/edit', feedController.loadEditPost); 
router.post('/feed/:id/edit', feedController.postEditPost);
router.post('/feed/:id/delete', feedController.deletePost);
router.get('/feed/:id/:comment_id', feedController.loadComment);

//TESTING :3
router.get('/profile', (req, res) => {
    console.log("app.js: routing to /profile, rendering profile.hbs");
    res.render('profile', { layout: 'layout' });
});

// USES
router.use(mainController.errorPage);

// router.post('/editProfile', profileController.editProfile); //added, will go back later




// router.get('/feed');   //<-- We need something like this after the user is logged in


// =================================================================
// Better clean allat once you are all done defining your request methods ^^^
module.exports = router;