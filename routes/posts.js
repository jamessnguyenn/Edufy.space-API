const router = require('express').Router();
const Post = require('../models/post.model');
const authenticateToken = require('./authenticateToken');

router.route('/').post(authenticateToken, (req, res)=>{
    const{avatar, description, name, location, badge} = req.body;
    const newPost = new Post({avatar, description, name, location, badge});
    newPost.save()
    .then(post=>{
        res.send({post_id: post._id});
    })
    .catch(err=>{
        res.status(400).json("Error " + err);
    })
})

router.route('/').get(authenticateToken, (req, res)=>{
    Post.find({}).sort({_id:-1})
    .then(posts=>{
        res.send(posts);
    })
    .catch(err => res.status(400).json("Error "+ err))
})

module.exports = router;