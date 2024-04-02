const mongoose = require('mongoose');

//importing the schema from the postModel.js
const Post = require('./postModel');

//pick a random default image for the user profile user_img - TO MOVE TO HELPER JS FILE
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
    rememberMe: { // Testing for rememberMe option
        type: String
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
    user_img: {
        //ADDED COMMENT ONLY: make sure to change the new header uploaded in js to {{username}}.jpg
        type: String,
        default: function () {
            const randomIndex = getRandom(0, 3);
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
        //ADDED COMMENT ONLY: make sure to change the new header uploaded in js to {{username}}header.jpg
        type: String,
        default: '../public/images/defaultheader.jpg' //grey bg
    },
    bio: {
        type: String,
        default: 'This user has not set a bio yet.',
        validate: { //ADDED
            validator: function (chars) {
                return chars.length <= 101;
            },
            //MONGOOSE: props is an object containing properties related to the validation context
            message: props => `${props.value} exceeds the maximum character limit of 101`
        }
    },
});

module.exports = mongoose.model('User', userSchema); // Export User model based on the user schema