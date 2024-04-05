/*

  Handles server-side functionality for the feed of Bookface

*/

const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js')

//loadFeed, feedPost[Yazan Changes], loadPost, postComment, loadEditPost, postEditPost, deletePost

const feedController = {

  getProfile: (req, res) => {
    res.render('profile');
  },

  async loadFeed(req,res){
    run()
    async function run(){
      try{
        const post = await Post.find().sort({'postDate' : -1});
        res.render('feed', {post:post, input:true});
      }catch(e){
        console.log(e.message);
      }
    }
  },

  async feedPost(req, res) {
    try {
      const userId = req.session.userId;          // Get logged-in user's ID from the current session
      const user = await User.findById(userId);   // Finding user in the database
      if(!user){
        console.log('User not found:', userId);
        return res.redirect('login'); //          // Redirect to login page if user is not logged in
      }
  
      // Get the post data from the request body from Gerome's old code
      const { postTitle, postContent, postTags } = req.body;
  
      const post = new Post({
        user_img: user.user_img, // [ERROR] user's image from User model
        user_name: `${user.firstName} ${user.lastName}`, // combine firstName and lastName from User model
        username: user.username, // username from User model
        postTitle,
        postContent,
        postTags,
      });
  
      // [ERROR] Save the post to the database
      await post.save();
  
      console.log('Post created successfully:', post);
      res.redirect('back');
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  async likePost(req,res){
    try{
      const userId = req.session.userId;          // Get logged-in user's ID from the current session
      const user = await User.findById(userId);   // Finding user in the database
      if(!user){
        console.log('User not found:', userId);
        return res.redirect('login'); //          // Redirect to login page if user is not logged in
      }
      const id = req.params.id;
      const post = await Post.findById({_id:id});
      post.postLikes.push(user);
      await post.save();
      console.log(post);
      res.redirect('back');
      //res.render('feed', {post:post, input:true});
    }catch(err){
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  async dislikePost(req,res){
    try{
      const userId = req.session.userId;          // Get logged-in user's ID from the current session
      const user = await User.findById(userId);   // Finding user in the database
      if(!user){
        console.log('User not found:', userId);
        return res.redirect('login'); //          // Redirect to login page if user is not logged in
      }
      const id = req.params.id;
      const post = await Post.findById({_id:id});
      post.postDislikes.push(user);
      await post.save();
      console.log(post);
      res.redirect('back');
      //res.render('feed', {post:post, input:true});
    }catch(err){
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  async loadPost(req,res){
    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await Post.findById({_id:id}).populate('postComments');
            //res.send(post);
            console.log(post);
            res.render('feed', {singlepost:post});
        }catch(e){
            console.log(e.message);
        }
    }

  },

  // LEGIT COPY PASTE FROM feedPost() method MWAHAHAHAHA
  async postComment(req, res) { // Changed, now the comment user is not hard coded
    try {
      const userId = req.session.userId; // Get logged-in user's ID from the current session
      const user = await User.findById(userId); // Find user in the database
      if (!user) {
        console.log('User not found:', userId);
        return res.redirect('login'); // Redirect to login page if user is not logged in
      }
  
      const id = req.params.id;
      const post = await Post.findById({_id: id});
      const commentContent = req.body.commentContent;
  
      // Create a new comment with the user's information and the comment data
      const comment = new Comment({
        user_img: user.user_img, // use user's image from User model
        user_name: `${user.firstName} ${user.lastName}`, // combine firstName and lastName from User model
        username: user.username, // use username from User model
        commentContent: commentContent,
        post: post._id
      });
  
      post.postComments.push(comment);
      await post.save();
      await comment.save();
      console.log(comment);
    } catch (e) {
      console.log(e.message);
    }
  
    try {
      const id = req.params.id;
      const post = await Post.findById({_id: id}).populate('postComments');
      console.log(post);
      res.redirect('back');
    } catch (e) {
      console.log(e.message);
    }
  },

  async loadEditPost(req,res){
    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await Post.findById({_id:id});
            console.log(post);
            res.render('feed', {editsinglepost:post, edit:true});
        }catch(e){
            console.log(e.message);
        }
    }
  },

  async postEditPost(req,res){
    run()

    async function run() {
        try{
            const id = req.params.id;
            const postTitle = req.body.postTitle;
            const postContent = req.body.postContent;
            const postTags = req.body.postTags;
            const post = await Post.updateOne({_id:id}, { $set: {postTitle:postTitle, postContent:postContent, postTags:postTags}}).sort({'postDate' : -1});
            //console.log(post);
            res.render('feed', {singlepost:post});
        }catch(e){
            console.log(e.message);
        }
    }

    reload()
    async function reload() {
        const id = req.params.id;
        const post = await Post.findById({_id:id});
        res.redirect('/feed/'+id);
    }
  },

  async deletePost(req,res){
    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await Post.deleteOne({_id:id});
            res.redirect('/feed');
        }catch(e){
            console.log(e.message);
        }
    }
  },

  async loadComment(req,res){
    run()
    async function run() {
        try{
            const id = req.params.id;
            // //const comment_id = req.params.comment_id;
            // const post = await Post.findById({_id:id});
            // const comment = await populateComments(post.postComments);
            // //res.send(post);
            // console.log(comment);
            // res.render('feed', {singlepost:post, comment:comment});
            res.send(id)
        }catch(e){
            console.log(e.message);
        }
    }
    
    async function populateComments(comments) {
      for (let comment of comments) {
        await comment.populate('commentComments').execPopulate(); // Populate children comments
        await populateComments(comment.commentComments); // Recursively populate children's children
      }
    }
  },

};

module.exports = feedController;