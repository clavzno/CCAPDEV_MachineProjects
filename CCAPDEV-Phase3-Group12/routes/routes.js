/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express'); // IMPORTANT! KEEP
const router = express.Router(); // IMPORTANT! KEEP
const mainController = require('../controllers/mainController'); // Import mainController
const authController = require('../controllers/authController'); // Import authController
const feedController = require('../controllers/feedController'); // Import feedController
const profileController = require('../controllers/profileController'); // Import profileController
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');

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
router.get('/search', mainController.searchPosts);

router.post('/login', authController.login); 
router.post('/signup', authController.signup);
//router.post('/createPost', feedController.createPost);

//router.get('/profile', feedController.getProfile);
router.get('/feed', feedController.loadFeed); 
router.post('/feed', feedController.feedPost);
router.get('/feed/:id', feedController.loadPost); 
router.post('/feed/:id', feedController.postComment);
router.get('/feed/:id/edit', feedController.loadEditPost); 
router.post('/feed/:id/edit', feedController.postEditPost);
router.post('/feed/:id/delete', feedController.deletePost);
router.get('/feed/:id/:comment_id', feedController.loadComment);

//render profile
router.get('/profile', async (req, res) => {
    console.log("app.js: routing to /profile, rendering profile.hbs");
    const userId = req.session.userId;          // Get logged-in user's ID from the current session
    const user_got = await User.findById(userId); 
    res.render('profile', { layout: 'layout' , user: user_got});
});
// update profile
router.post('/profile/:username/:displayName/:bio', async (req, res) => {
    console.log("app.js: routing to /profile, updating profile.hbs");
    profileController.updateProfile(req, res);
});


// USES
router.use(mainController.errorPage);

// router.post('/editProfile', profileController.editProfile); //added, will go back later




// router.get('/feed');   //<-- We need something like this after the user is logged in


// =================================================================
// Better clean allat once you are all done defining your request methods ^^^
module.exports = router;