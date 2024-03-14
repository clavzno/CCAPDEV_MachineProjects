var express = require('express');
var router = express.Router();
const posts = require('../models/postModel.js');

router.get('/', (req, res) => {
    run()
    async function run(){
        const post = await posts.find();
        res.render('feed', {post:post});
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
        const post = await posts.find();
        res.render('feed', {post:post});
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

module.exports = router;