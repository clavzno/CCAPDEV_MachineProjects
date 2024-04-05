const cookieParser = require("cookie-parser");
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js')

const profileController = {

    getProfile: (req, res) => {
        res.render('profile');
    },

    async getCurrentUser(req, res) {
        try {
        // from feedController: async feedPost(req, res)
        const userId = req.session.userId; 
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            console.log("async getCurrentUser error, user not logged in. Redirecting to login")
            console.log('User not found:', userId);
            return res.redirect('login');
        }
        // end referenced code from feedController

        // store it in a user thing
        const user = new User(
            {
                user_header: foundUser.user_header, 
                user_img: foundUser.user_img,
                username: foundUser.username,
                displayName: foundUser.displayName,
                bio: foundUser.bio
            }
        );

        } catch (error) {
            console.log("profileController: getCurrentUser error.");
            console.error(err);
            return res.status(500);
        }
    },

    //testing stuff below idk what's going on, these are supposed to connect to the selector frontend js
    async viewCurrentUserPosts(req, res) {
        this.getCurrentUser(req, res);
        loadUserPosts();
        async function loadUserPosts() {
            try {
                const userId = req.session.userId;
                const posts = await Post.find({ user: userId });
                res.render('profile', { posts });
            } catch (error) {
                console.error("profileController: viewCurrentUserPosts: Error fetching user posts:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    },

    async viewCurrentUserReplies(req, res) {
        try {
            const userId = req.session.userId;
            const comments = await Comment.find({ user: userId });
            res.json({ comments }); // Example: return user's comments/replies as JSON
        } catch (error) {
            console.error("profileController: viewCurrentUserReplies: Error fetching user replies:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

module.exports = profileController;