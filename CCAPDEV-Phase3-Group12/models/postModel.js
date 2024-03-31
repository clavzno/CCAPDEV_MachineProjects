const mongoose = require('mongoose');
const User = require('../models/userModel');

const postSchema = new mongoose.Schema({
    user_img: {  //is it technically possible link the profile image to this?
      type: String,
      required: true
    },
    user_name: { //same with this
      type: String,
      required: true
    },
    username: { //same with this
      type: String,
      required: true
    },
    // MY ADDITION IDEA 
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    postDate: {
      type: Date, 
      default:Date.now
    },
    postTitle: {
      type: String,
      required: true
    },
    postContent: {
      type: String,
      required: true
    },
    postTags: {
      type: String,
      required: true
    },
    postPicture: {
      type: String
    },
    postComments: [{
      type: Number,
      ref: 'comments',
    }],
    postLikes: {
      type: Number,
      default: 0
    },
    postDislikes: {
      type: Number,
      default: 0
    },
  });

module.exports = mongoose.model('Post', postSchema); // Export post model based on the post schema