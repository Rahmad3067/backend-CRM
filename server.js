const express=require("express")
const app=express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const router=require("./router/ContactRouter")
const cookieParser = require("cookie-parser");

dotenv.config({
    path:"./config.env"
})

// Middlewares
app.use(express.json())
app.use(cookieParser());
// Connect to MongoDB
mongoose.connect(process.env.DB,{useNewUrlParser:true,}).then(()=>{
    console.log("connected to mongoDB!")
})
// routes
app.use("/api",router)

// Server
app.listen(process.env.PORT,()=>(console.log("this server listing port:6000")))