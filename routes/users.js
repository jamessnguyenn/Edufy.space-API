const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateToken = require('./authenticateToken');


router.route('/').post((req,res) =>{
    const BCRYPT_SALT_ROUNDS=12;
    const{firstName, lastName, email, password, location} = req.body;

    if(!firstName || !lastName || !email || !location || !password){
        return res.status(400).json({msg:'All fields must be filled'});
    }
    let hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);

    const newUser = new User({firstName, lastName, hashedPassword, email, location});

    newUser.save()
    .then(user =>{
        jwt.sign({
            user_id: user._id,
        },
        process.env.JWT_SECRET,
        (err, token) =>{
            if(err) throw err;
            res.json({token, user_id: user._id});
        })
    })
    .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
    .select('-hashedPassword')
    .then(user=>res.json(user));
})

router.route('/:id/todos').post(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: "User is unauthorized to post"});
    }
    User.findById(req.params.id)
    .then(user =>{
        const checked = false;
        const{description, dueDate} = req.body
        user.todos.push({description, checked, dueDate});
        user.save()
        .then(()=>res.json("Todo added"))
        .catch(err=> res.status(400).json('Error: ' + err));
    })
    .catch(err=> res.status(400).json('Error: ' + err))
})

router.route('/:id/todos/:todoid/checked').put(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: "User is unauthorized to post"});
    }
    User.findOneAndUpdate({"_id": req.params.id, "todos._id": req.params.todoid},{
        $set:{
            "todos.$.checked": req.body.checked
        }
    },
    (err, updated)=>{
        if(err) throw err;
        res.send("Todo has been Updated");
    })
})

router.route('/:id/todos/:todoid').delete(authenticateToken, (req, res)=>{
    User.findOneAndUpdate({"_id": req.params.id},{
        $pull:{
            'todos': {'_id': req.params.todoid}
        }
    },(err, updated)=>{
        if(err) throw err;
        res.send("Todo Deleted");
    })
})

router.route('/:id/health').put(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: "User is unauthorized to update"});
    }
    User.findOneAndUpdate({"_id": req.params.id},
    {$set: {'health': req.body.health}}, {new: true})
    .then(updatedHealth => res.send("Succefully updated health"))
    .catch(err=> res.status(400).json('Error: '+err))
})

router.route('/:id/gold').put(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: "User is unauthorized to update"});
    }
    User.findOneAndUpdate({"_id": req.params.id},
    {$set: {'gold': req.body.gold}}, {new: true})
    .then(updatedGold=>res.send("Succefully updated gold"))
    .catch(err=> res.status(400).json('Error: '+err))
})

router.route('/:id/avatar').put(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: 'User is unauthorized to update'});
    }
    User.findOneAndUpdate({"_id": req.params.id},
    {$set: {'avatar': req.body.avatar}}, {new: true})
    .then(updatedAvatar=>res.send("Succefully updated avatar"))
    .catch(err=> res.status(400).json('Error: '+err))
})

router.route('/:id/badge').put(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: 'User is unauthorized to update'});
    }
    User.findOneAndUpdate({"_id": req.params.id},
    {$set: {'badge': req.body.badge}}, {new: true})
    .then(updatedBadge=>res.send("Succefully updated badge"))
    .catch(err=> res.status(400).json('Error: '+err))
})

router.route('/:id/bought').post(authenticateToken, (req, res)=>{
    if(req.params.id != req.user.user_id){
        return res.status(401).json({msg: "User is unauthorized to post"});
    }
    User.findById(req.params.id)
    .then(user =>{
        user.bought.push(req.body.bought);
        user.save()
        .then(()=>res.json("Bought Items updated"))
        .catch(err=> res.status(400).json('Error: ' + err));
    })
    .catch(err=> res.status(400).json('Error: ' + err))
})

router.route('/auth').post((req, res)=>{
    const{ email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg: 'Missing Fields'});
    }
    User.findOne({email})
        .then(user =>{
            if(!user) return res.status(400).json({msg: 'Invalid email or password'});
            bcrypt.compare(password, user.hashedPassword)
                .then(matches =>{
                    if(!matches) return res.status(400).json({msg: 'Ivalid email or password'});
                    jwt.sign({
                        user_id: user._id,
                    },
                    process.env.JWT_SECRET,
                    (err, token) =>{
                        if(err) throw err;
                        res.json({token, user_id: user._id});
                    })
                })
        })
        .catch(err=>{
            res.status(400).json('Error: ' +err)
        })

})
module.exports = router;