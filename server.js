const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const app = express();


dotenv.config({
    path: "./config.env",
});
// Our middlewares
app.use(express.json());
app.use(cookieParser());


// Our routes
const userRouter = require("./router/UserRouter");
const contactRouter = require("./router/ContactRouter");
app.use('/user', userRouter);
app.use('/contact', contactRouter);


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connected to MongoDB !");
    });






app.listen(process.env.PORT, () => {
    console.log("Listening on port 6000");
});