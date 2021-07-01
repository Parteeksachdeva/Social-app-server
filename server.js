const express = require("express");
const app=express();
const jwt=require("jsonwebtoken");
var cors = require('cors')
const mongoose = require("mongoose")

const UserDetail = require("./Scema/User")
const PostMessage = require("./Scema/Posts")

app.use(cors()) 
app.use(express.json())

const CONNECTION_URL="mongodb+srv://social-app:social123@cluster0.davuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{console.log("Done")})
.catch(err=>console.log(err))




app.get("/",authentecate,(req,res)=>{
    res.send(req.user.name);
})


app.post("/register",async (req,res)=>{
    const {username,password}=req.body;
    const Userfind=await UserDetail.find({username: username,})
    if(Userfind.length>0){
        res.status(400).json({"error": "User Already exists"})
    }
    const User =await new  UserDetail({
        username: username,
        password:password,
    });
    await User.save();
    res.json("success")
})
app.post("/login",async (req,res)=>{
    const {username,password}=req.body;

    // const Posts =await new  PostMessage({
    //         username: username
    //     });
    
    //     await Posts.save();
    const user=await UserDetail.find({username: username,})
    //  console.log(user)

    if(user.length>0 && password===user[0].password){
        const user={name:username}
        const token=jwt.sign(user,"abjkbcwkvbiuweevjnwkjenvjkwee")
        res.json({token:token})
    }
    else{
        res.status(400).json({"error": "Invalid credentials"})
        
    }
    
})




function authentecate(req,res,next){
    const authHeader= req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token==null) return res.sendStatus(401);

    jwt.verify(token,"abjkbcwkvbiuweevjnwkjenvjkwee",(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next()
    })
}



app.listen(8000,()=>{
    console.log("litening on 8000")
})