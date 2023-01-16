const express=require("express")

const {UserModel}=require("../model/user.model.js");

const bcrypt=require("bcrypt");

const register_router=express.Router();

register_router.post("/users/register", async(req,res)=>{

    
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password, 5, async(err, secured_pass)=> {
            if(err)
            {
                console.log("err",err)
            }
            else{
              const user= new UserModel({name,email,gender,password:secured_pass});
              await user.save();
              res.send("Registered sucessful");
            }
        });
    } catch (error) {
        res.send("something went wrong in register")
        console.log("err:",error)
    }
})


module.exports={
    register_router
}