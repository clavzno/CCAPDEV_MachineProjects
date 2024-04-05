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
router.get('/feed/popular', feedController.loadPopular);
router.post('/feed', feedController.feedPost);
router.get('/feed/:id', feedController.loadPost); 
router.post('/feed/:id', feedController.postComment);
router.post('/feed/:id/like', feedController.likePost);
router.post('/feed/:id/dislike', feedController.dislikePost);
router.get('/feed/:id/edit', feedController.loadEditPost); 
router.post('/feed/:id/edit', feedController.postEditPost);
router.post('/feed/:id/delete', feedController.deletePost);
router.get('/feed/:id/:comment_id', feedController.loadComment);
router.get('/feed/:id/:comment_id/like', feedController.likeComment);

//render profile
router.get('/profile', async (req, res) => {
    console.log("routes.js: routing to /profile, rendering profile.hbs");
    const userId = req.session.userId;          // Get logged-in user's ID from the current session
    const user_got = await User.findById(userId); 
    res.render('profile', { layout: 'layout' , user: user_got});
});
// update profile
/* router.post('/profile/:user_name/:displayName/:bio', async (req, res) => {
    console.log("app.js: routing to /profile, updating profile.hbs");
    profileController.updateProfile(req, res);
}); */
router.post('/profile', async (req, res) => {
    console.log("routes.js: router.post(/profile): routing to POST /profile, updating profile.hbs");
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).send('Router');
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('routes.js: router.post(/profile) error: user not found');
        }
        // Update user's profile based on data in req.body
        user.user_name = req.body.user_name;
        user.displayName = req.body.displayName;
        user.bio = req.body.bio;
        await user.save();
        res.redirect('/profile');
    } catch (error) {
        console.error('error updating profile:', error);
        res.status(500).send('routes.js: router.post(/profile) error');
    }
});


// USES
router.use(mainController.errorPage);

// router.post('/editProfile', profileController.editProfile); //added, will go back later




// router.get('/feed');   //<-- We need something like this after the user is logged in


// =================================================================
// Better clean allat once you are all done defining your request methods ^^^
module.exports = router;