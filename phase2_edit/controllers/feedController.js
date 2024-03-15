/*

  Handles server-side functionality for the feed of Bookface
  logout:       logs the user out

*/

const mongoose = require('mongoose');
const Post = require('../models/postModel.js'); // Import the Post model
const express = require('express');
const cookieParser = require("cookie-parser");


const feedController = {

// Render the feed page
getFeed: async (req, res) => {
  try {
    const posts = await Post.find().sort({ postDate: -1 }).limit(20);
    res.render('feed', { post: posts, input: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
},

  
  // Handle creating a new post
  createPost: async (req, res) => {
    const { postTitle, postContent, postTags, postPicture } = req.body;

    try {
      // Create a new post with the data from the request body
      const newPost = new Post({
        user: req.user._id, // The logged-in user's ID
        postTitle,
        postContent,
        postTags,
        postPicture,
        postDate: Date.now(), // The current date and time
      });

      await newPost.save(); // Save the post to the database

      // Send success response or redirect to a confirmation page (optional)
      console.log('Post created successfully');
      res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

};

module.exports = feedController;