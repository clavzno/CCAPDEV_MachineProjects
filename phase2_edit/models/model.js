const mongoose = require('mongoose');
const schema = new mongoose.Schema //created a separate schema to make stuff reusable

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

module.exports = mongoose.model('User', userSchema); // Export User model based on the user schema