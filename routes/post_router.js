
const express=require("express");

const post_router=express.Router();

const {authenticate}=require("../middleware/authentication.js")

const {PostModel}=require("../model/post.model.js");

post_router.use(authenticate);
post_router.get("/posts",async (req,res)=>{
    try {
        
      const post= await PostModel.find();
      res.send(post);

    } catch (error) {
        res.send("There is no post");
        console.log("err",error)
    }
})

post_router.post("/add",async (req,res)=>{
   
    const payload=req.body;

    try {
        
      const post= await PostModel(payload);
      await post.save();
      res.send("post added");

    } catch (error) {
        res.send("something wrong while adding post");
        console.log("err",error)
    }
})


post_router.patch("/posts/update/:id",async (req,res)=>{

     const ID=req.params.id;
     let payload=req.body;
    try {
        
      const post= await PostModel.findByIdAndUpdate(ID,payload);
      res.send("post updated");

    } catch (error) {
        res.send("wrong in updating");
        console.log("err",error)
    }
})

post_router.delete("/posts/delete/:id",async (req,res)=>{

    const ID=req.params.id;
    
   try {
       
     const post= await PostModel.findByIdAndDelete(ID);
     res.send("post deleted");

   } catch (error) {
       res.send("wrong in deleting");
       console.log("err",error)
   }
})

post_router.get("/posts",async (req,res)=>{

    let query=req.query;
    try {
        
      const post= await PostModel.find(query);
      res.send(post);

    } catch (error) {
        res.send("There is no post");
        console.log("err",error)
    }
})


post_router.get("/posts",async (req,res)=>{

   const query1=req.query.device1;
    const query2=req.query.device2;
    try {
        
      const post= await PostModel.find({"device":query1,"device":query2});
      res.send(post);

    } catch (error) {
        res.send("There is no post");
        console.log("err",error)
    }
})

module.exports={
    post_router
}


