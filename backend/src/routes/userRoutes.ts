import express from "express"
import { User } from "../db/db";
import { Bank } from "../db/db";
import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import mongoose from "mongoose";
export const userRoute = express.Router();
const JWT_SECRET:string ="hellowtherethisissundaynight2amisupposedtobesleepingbutiamherewritingcode"
mongoose.connect("mongodb+srv://anujsidam:BpmiQhJxtry2mA7B@cluster0.mbpg7d7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

function generateToken(id:string):string{
    return jwt.sign(id,JWT_SECRET)

}

async function userAuth(req:Request, res:Response,next:NextFunction){
    const token:any = req.headers['token'];
    try{
        const _id = jwt.verify(token,JWT_SECRET);
        const respo = await User.findById({
            _id

        })
        if(respo){
            next();
        }
    }
    catch(err:any){
        res.status(411).send(err.message)
    }
    
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
        await Bank.create({
            userId:respo.id,balance:1+Math.random()*10000
        }) 
       const token = generateToken(respo.id)
       res.send(token)
    }
    

   
})


userRoute.post('/send',userAuth,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const token:any = req.headers['token']
    const _id = jwt.verify(token,JWT_SECRET)
    const senderAccount:any = await Bank.findOne({userId:_id}).session(session);
    const amount = Number (req.body.amount)
    const username = req.body.username
    const respo:any = await User.findOne({username:username}).session(session);
    
    const reciverId = respo._id;

    if(!_id || senderAccount.balance < amount ){
        await session.abortTransaction();
        res.status(400).json({"err":"Insufficient Blanace or Sender Not Found "})
    }
 
    if(!reciverId){
        await session.abortTransaction();
        res.status(400).json({"msg":"Reciver  Not FOund "})
    }

    await Bank.updateOne({ userId: _id }, { $inc: { balance: -amount } }).session(session);
    await Bank.updateOne({ userId: reciverId  }, { $inc: { balance: amount } }).session(session);
    await session.commitTransaction();
    res.json({"msg":"Transaction Succeded !!!! "})





})