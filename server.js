const express=require("express")
const app=express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const router=require("./router/ContactRouter")
const registerRouter=require("./router/ContactRouter")
const loginRouter=require("./router/ContactRouter")
const cookieParser = require("cookie-parser");

dotenv.config({
    path:"./config.env"
})
app.use(express.json())
app.use(cookieParser());

mongoose.connect(process.env.DB,{useNewUrlParser:true,}).then(()=>{
    console.log("connected to mongoDB!")
})

app.use("/contact",router)
app.use("/register",registerRouter)
app.use("/login",loginRouter)

app.listen(process.env.PORT,()=>(console.log("this server listing port:6000")))