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
      res.render('feed', {post:post, input:true});
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

  async postComment(req,res){
    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await Post.findById({_id:id});
            const commentContent = req.body.commentContent;
            const comment = new Comment({user_img:'https://th.bing.com/th/id/OIP.Ic46Rb_vT5RxaqfDbZNhVAHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7', user_name:'Tom Johnson', username:'@TJ123', commentContent:commentContent, post:post._id});
            post.postComments.push(comment);
            await post.save();
            await comment.save();
            console.log(comment);
        }catch(e){
            console.log(e.message);
        }
    }

    reload()
    async function reload(){
      try{
        const id = req.params.id;
        const post = await Post.findById({_id:id}).populate('postComments');
        //res.send(post);
        console.log(post);
        res.redirect('back');
    }catch(e){
        console.log(e.message);
    }
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