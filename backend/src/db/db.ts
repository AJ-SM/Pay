import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minlength:3,
        maxlength:13
    },
    password:{
        type:String,
        minlength:8,
        maxlength:12,
        required:true,
    }
})

export const User = mongoose.model('users',userSchema)

