const express=require("express")

const jwt=require("jsonwebtoken");

const {UserModel}=require("../model/user.model.js");

const bcrypt=require("bcrypt");

const login_router=express.Router();

login_router.post("/users/login", async(req,res)=>{

    
    const {email,password}=req.body;
    try {
       const user =await UserModel.find({email});
       if(user.length>0)
       {
        bcrypt.compare(password,user[0].password, (err,result)=>{
            if(result)
            {
                const token=jwt.sign({school:'masaischool'},'masai');
                res.send({"msg":"login Sucessful","token":token})
            }
            else
            {
                res.send("wrong credentials")
            }
        })
       }
       
    } catch (error) {
        res.send("something went wrong in login")
        console.log("err:",error)
    }
})


module.exports={
   login_router
}