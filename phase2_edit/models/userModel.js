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
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  //remove confirm password
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
    type: Schema.Types.ObjectId,
    ref: 'User' // referring to this model (exported as 'User' below)
  }], 
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // referring to this model (exported as 'User' below)
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post' // referring to the model 'posts' in postModel.js
  }],
});

module.exports = mongoose.model('User', userSchema); // Export User model based on the user schema