/*

  Handles server-side functionality for the feed of Bookface

*/

const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
const users = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js')

//loadFeed, feedPost, loadPost, postComment, loadEditPost, postEditPost, deletePost

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

  async feedPost(req,res){
    run()
    async function run() {
      try{
        //const user_img = req.body.user_img; not working
        //res.send(req.body.postTitle)
        const postTitle = req.body.postTitle;
        const postContent = req.body.postContent;
        const postTags = req.body.postTags;
        const post = new Post({user_img:'https://th.bing.com/th/id/OIP.Ic46Rb_vT5RxaqfDbZNhVAHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7', user_name:'Tom Johnson', username:'@TJ123', postTitle:postTitle, postContent:postContent, postTags:postTags});
        await post.save();
        console.log(post);
      }catch(e){
        console.log(e.message);
      }
    }

    reload()
    async function reload() {
      const post = await Post.find().sort({'postDate' : -1});
      res.redirect('back');
      //res.render('feed', {post:post, input:true});
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