const mongoose = require('mongoose'); // Importing mongoose module
const Post = require('../models/postModel.js'); // Import the Post model

const mainController = {
    // Existing method to render error page
    errorPage: (req, res) => {
        res.render("error", { title: "Page not found" });
    },
    // Handle search implementation
    async searchPosts(req, res){
        try {
            // Get the search query from the request
            const query = req.query.q;

            // Find posts with a tag that matches the search query
            const posts = await Post.find({ postTags: query });

            // Render the posts on the 'feed' page
            res.render('feed', { post: posts, input: true });
        } catch (error) {
            console.error(`Error searching for posts: ${error}`);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = mainController;