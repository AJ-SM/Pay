import mongoose from "mongoose";
import { required } from "zod/v4/core/util.cjs";

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

const BankSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,

    },
    balance:{
        type:Number,
        
        required:true
    }
})

export const User = mongoose.model('users',userSchema);
export const Bank = mongoose.model('bank',BankSchema);

