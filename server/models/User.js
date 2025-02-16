const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    }
},{timeStamps:true});

const Users = mongoose.model('User',userSchema);

module.exports = {Users}