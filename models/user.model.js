const mongoose = require('mongoose');

    
const toDoSchema = new mongoose.Schema({
    description: String,
    checked: Boolean,
    dueDate: Date,
    severity: String});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName:{
        type: String,
        required: true
      },
      hashedPassword: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
    location: {
        type: String,
        required: true
      },
    todos:[toDoSchema],
    health:{
        type:Number,
        default: 100
    },
    gold:{
        type:Number,
        default:0
    },
    avatar:{
        type: String,
        default:'https://lh3.googleusercontent.com/ENuDUEHPuKFtmvR2KLTCKQvrQblDKLf4w_S8ktHfShg5y6fsEmVtwOzBE5wRoUaASE7nIZ__MyqK1uxzVBQodEQgJttpnfkQ1qs5E6N_FGz0FXr2qge3L67ra1GiwD-YMKu7oXM8sfvaMfWwDzYgQ6jfqp1pFPEhEYLOaSibim2rxX52g-blOG1nH4BPBQcjkbKMKd9qKgNxxW0Y5Ub0S_IrBR8UsVF4DnGRAgzQbC2UI3Hns7ZaqGMcJIrq-F2bhpbM78Q9_clvSfbDb0fq5LDFz_uqBylkeODeTqFYKuM4s0uaOCG5Jj5s8K602g-AUy_e3dalG8l6kp--YRpoctid4RamUPBkredpoHizbZSjbXDievZBqTlWWXrShSEpW2RYLF3kyyzX3ETkyZDTCV8ap882Y4ZfANTM8txBA9bl5Q-M2b8cfCW05MHNOwipDOMQNHKYzP8WSeSOoC0_6vTMWy_tZ0b4T3mSPbiSndG1RlpcxOwihX2w9Lp-YJesM-u_VZxAUGK2yGXYeUEdCRoJys6YqeaN3g-vzihmalPnoEoSk50MuiFIptDrXhwdX1zjw4r9-q8HcPuEDZEGI799HzLtFuE6m7QB8w2jHezoAimn74kK60ishZ5HBvdsQU44on0CaKuibicN_gopyuUUrBPSMX-CKdYJ9u8NUQ0zH_7h9yZaqQsOt0BB4g=s512-no?authuser=0',
    },
    bought:[Number],
    badge:{ 
      type: Boolean,
      default: false

    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
