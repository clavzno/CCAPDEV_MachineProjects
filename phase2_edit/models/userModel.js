const mongoose = require('mongoose');

//importing the schema from the postModel.js
const Post = require('./postModel');

const userSchema = new mongoose.Schema({
  //user account requirements
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  //profile and feed requirements
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // referring to this model (exported as 'User' below)
  }], 
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // referring to this model (exported as 'User' below)
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post' // referring to the model 'posts' in postModel.js
  }],
  // moved user_img down here
  user_img: {
    type: String,
    default: '../public/images/helldivers_2.jpg' // Default profile image
  },
  user_header: {
    type: String,
    default: '../public/images/helldivers_2.jpg' // Default header image
  },
});

module.exports = mongoose.model('User', userSchema); // Export User model based on the user schema