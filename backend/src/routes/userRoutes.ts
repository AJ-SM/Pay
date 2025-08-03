import express from "express"
import { User } from "../db/db";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const userRoute = express.Router();
const JWT_SECRET:string ="hellowtherethisissundaynight2amisupposedtobesleepingbutiamherewritingcode"
mongoose.connect("mongodb+srv://anujsidam:BpmiQhJxtry2mA7B@cluster0.mbpg7d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

function generateToken(id:string):string{
    return jwt.sign(id,JWT_SECRET)

}
userRoute.post('/signup',async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    try{
    const resp = await User.create({
        username:username,
        password:password
    })
    }catch(err:any){
        res.status(411).send(err.message)
    }
    res.status(200).send("user Created")

   
})

userRoute.post('/login',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const respo = await User.findOne({
        username:username,password:password
    })
    if(respo){
       const token =  generateToken(respo.id)
       res.json({"token":token})
    }
    

   
})