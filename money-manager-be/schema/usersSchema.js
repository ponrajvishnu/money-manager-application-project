const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true,
        validate:(value)=>validator.isEmail(value)
    },
    password:{type:String, required:true},
    role: {type: String, default:"admin"},
    status:{type:String,default:"Y"},
    createdAt:{type:Date,default:Date.now()}
},{versionKey:false,collection:'user'})

const UserModel = mongoose.model('user',UserSchema)
module.exports = {UserModel}