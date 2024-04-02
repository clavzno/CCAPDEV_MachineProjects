const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
    commentDate: {
      type: Date, 
      default:Date.now
    },
    commentContent: {
      type: String,
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    commentLikes: {
      type: Number,
      default: 0
    },
    commentDislikes: {
      type: Number,
      default: 0
    },
    commentComments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
  });

module.exports = mongoose.model('Comment', commentSchema); // Export post model based on the post schema