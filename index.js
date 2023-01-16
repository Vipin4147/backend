const express=require("express");
const {connection}=require("./config/db.js")
const app=express();


const {register_router}=require("./routes/register_router.js")
const {login_router}=require("./routes/login_router.js")
const {post_router}=require("./routes/post_router.js")
app.use(express.json());

app.use(register_router);
app.use(login_router);

app.use(post_router);


app.listen(3000,async()=>{
    try {
        await connection 
        console.log("connected to db");
    } catch (error) {
        console.log("something went wrong in connection")
        console.log("err",error);
    }
 
    console.log("server is running at 3000")
})