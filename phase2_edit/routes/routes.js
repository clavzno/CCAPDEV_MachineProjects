/* 

NEed routes from JS files ( COntroller )

*/

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import authController
const schemas = require('../models/userModel.js');
const posts = require('../models/postModel.js');

const app = express();
// app.get('/', authController.login);  // Idk wat to expect
router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);

router.post('/login', authController.login); 
router.post('/signup', authController.signup);

// router.get('/feed');   <-- We need something like this after the user is logged in



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

router.get('/feed', (req, res) => {
    run()
    async function run(){
        const post = await posts.find();
        res.render('feed', {post:post});
    }
});

router.post('/post', (req,res) => {
    run()
    async function run() {
        //const user_img = req.body.user_img; not working
        const postContent = req.body.postContent
        const post = new posts({user_img:'https://th.bing.com/th/id/OIP.Ic46Rb_vT5RxaqfDbZNhVAHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7', user_name:'Tom Johnson', username:'@TJ123', postContent:postContent});
        await post.save();
        console.log(post);

        await posts.find();
        res.render('feed', {post:post});
    }

    reload()
    async function reload() {
        const post = await posts.find();
        res.render('feed', {post:post});
    }

});




// module.exports = app; i dont think we will be exporting 'app' anymore, but let's keep in case
module.exports = router;