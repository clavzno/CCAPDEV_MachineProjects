const mongoose = require('mongoose');

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
    postLikes: {
      type: Number,
      default: 0
    },
    postDislikes: {
      type: Number,
      default: 0
    }//,
    // postComments: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   default: 0
    // },
  });

module.exports = mongoose.model('posts', postSchema); // Export post model based on the post schema