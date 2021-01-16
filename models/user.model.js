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
        default:'https://www.flaticon.com/svg/vstatic/svg/1077/1077012.svg?token=exp=1610783281~hmac=e06f13733dec6650de10912b097b80e5',
    },
    bought:[Number],
    badge:{ 
      type: Boolean,
      default: false

    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
