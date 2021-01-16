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
    toDos:[toDoSchema],
    health:{
        type:Number,
        default: 100
    },
    gold:{
        type:Number,
        default:0
    },
    profileImage:{
        type: String,
        default:0
    },
    badge: boolean
})

const User = mongoose.model('User', userSchema);

module.exports = User;
