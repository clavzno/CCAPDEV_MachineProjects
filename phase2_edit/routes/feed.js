var express = require('express');
var router = express.Router();
const posts = require('../models/postModel.js');
const comments = require('../models/commentModel.js')

router.get('/', (req, res) => {
    run()
    async function run(){
        const post = await posts.find().sort({'postDate' : -1});
        res.render('feed', {post:post, input:true});
    }
});


router.post('/', (req,res) => {
    run()
    async function run() {
        //const user_img = req.body.user_img; not working
        //res.send(req.body.postTitle)
        const postTitle = req.body.postTitle;
        const postContent = req.body.postContent;
        const postTags = req.body.postTags;
        const post = new posts({user_img:'https://th.bing.com/th/id/OIP.Ic46Rb_vT5RxaqfDbZNhVAHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7', user_name:'Tom Johnson', username:'@TJ123', postTitle:postTitle, postContent:postContent, postTags:postTags});
        await post.save();
        console.log(post);
    }

    reload()
    async function reload() {
        const post = await posts.find().sort({'postDate' : -1});
        res.render('feed', {post:post, input:true});
    }

});

router.get('/:id', (req,res) => {

    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await posts.findById({_id:id});
            //res.send(post);
            console.log(post);
            res.render('feed', {singlepost:post});
        }catch(e){
            console.log(e.message);
        }
    }

});

router.post('/:id', (req,res) => {

    run()
    async function run() {
        try{
            const commentContent = req.body.commentContent;
            const comment = new comments({user_img:'https://th.bing.com/th/id/OIP.Ic46Rb_vT5RxaqfDbZNhVAHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7', user_name:'Tom Johnson', username:'@TJ123', commentContent:commentContent});
            await comment.save();
            console.log(comment);
        }catch(e){
            console.log(e.message);
        }
    }

});

router.get('/:id/edit', (req,res) => {

    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await posts.findById({_id:id});
            console.log(post);
            res.render('feed', {editsinglepost:post, edit:true});
        }catch(e){
            console.log(e.message);
        }
    }

});

router.post('/:id/edit', (req,res) => {

    run()

    async function run() {
        try{
            const id = req.params.id;
            const postTitle = req.body.postTitle;
            const postContent = req.body.postContent;
            const postTags = req.body.postTags;
            const post = await posts.updateOne({_id:id}, { $set: {postTitle:postTitle, postContent:postContent, postTags:postTags}}).sort({'postDate' : -1});
            //console.log(post);
            res.render('feed', {singlepost:post});
        }catch(e){
            console.log(e.message);
        }
    }

    reload()
    async function reload() {
        const id = req.params.id;
        const post = await posts.findById({_id:id});
        res.redirect('/feed/'+id);
    }
})

router.post('/:id/delete', (req,res) => {

    run()
    async function run() {
        try{
            const id = req.params.id;
            const post = await posts.deleteOne({_id:id});
            res.redirect('/feed');
        }catch(e){
            console.log(e.message);
        }
    }

});


module.exports = router;