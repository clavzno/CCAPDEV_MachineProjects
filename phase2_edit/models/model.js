const mongoose = require('mongoose');
const schema = mongoose.Schema //created a separate schema to make stuff reusable

const userSchema = new schema({
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
  birthdate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  }
});

const postSchema = new schema({
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
  postContent: {
    type: String,
    required: true
  },
  postPicture: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema); // Export User model based on the user schema
module.exports = mongoose.model('post', postSchema); // Export post model based on the post schema