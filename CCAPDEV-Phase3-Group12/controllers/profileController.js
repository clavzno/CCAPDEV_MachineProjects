const cookieParser = require("cookie-parser");
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js')

const profileController = {

    getProfile: (req, res) => {
        res.render('profile');
        console.log(req.session.username + " is viewing their profile page.");
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

            // store it in a user thing || Yazan Comment: It works even if u comment this part out of the code lol
            const user = new User(
                {
                    user_header: foundUser.user_header,
                    user_img: foundUser.user_img,
                    username: foundUser.username,
                    // user_name: `${foundUser.firstName} ${foundUser.lastName}`,
                    displayName: foundUser.displayName,
                    bio: foundUser.bio
                }
            );
            // Pass the found user to the template
            // res.render('profile', { User });
            // ^^ Keep that if u want, they both work, the 'User' acts as the template we are accessing when rendering profile.

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
    },

    //uses editProfileDialog.hbs, handles form data and updates the user profile
    async updateProfile(req, res) {
        console.log("profileController: updateProfile called");
        const userId = req.session.userId;
        const { user_name, displayName, bio } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                user_name,
                displayName,
                bio,
            }, { new: true });

            if(!updatedUser) {
                console.log("User not found:", userId);
                return res.redirect('/profile');
            }

            console.log("profileController: updateProfile: User profile updated successfully:");
            res.redirect('/profile');
        } catch (error) {
            console.error("profileController: updateProfile error:", error);
            return res.status(500).redirect('/profile');
        }
    }
    
};

module.exports = profileController;