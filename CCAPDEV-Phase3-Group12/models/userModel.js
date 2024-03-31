const mongoose = require('mongoose');

//importing the schema from the postModel.js
const Post = require('./postModel');

//pick a random default image for the user profile user_img
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

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
    // default: '../public/images/helldivers_2.jpg' Default profile image
    // plan: make it like ../pub/img/<username>.jpg and same for userheader
    // anytime there's a change it will overwrite and keep the same file name
    default: function() {
      const randomIndex = getRandomNumber(0, 3);
      const defaultImages = [
        '../public/images/default0.jpg', //jack default
        '../public/images/default1.jpg', //yazan default
        '../public/images/default2.jpg', //fred default
        '../public/images/default3.jpg' //gerome default
      ];
      return defaultImages[randomIndex];
    }
  },
  user_header: {
    type: String,
    default: '../public/images/defaultheader.jpg' //grey bg
  },
});

module.exports = mongoose.model('User', userSchema); // Export User model based on the user schema