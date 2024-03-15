//controller for profile.hbs

const mongoose = require('mongoose'); // Importing mongoose module
const User = require('../models/userModel.js'); // Import the User model
const Post = require('../models/postModel.js'); // Import the Post model


const profileController = {
//get user info here

//conditions for button to show edit profile or follow (if not logged in user's profile, show follow/unfollow button)

//get post lists and comment lists

//event listener for edit profile dialog (editProfileDialog.hbs)

//event listener for the posts/comments selector (postsCommentsSelector.hbs)

//render the profile page
getProfile (req, res) {
    res.render('profile');
}, 

};

function openPopup() {
    document.getElementById("editProfile").style.display = "block";
}

function closePopup() {
    document.getElementById("editProfile").style.display = "none";
}

module.exports = profileController; // Exporting the profileController module

//AUUUGH AAAHHH AUUGUGGAHGHHH