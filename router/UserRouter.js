const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Regex for password should be minimum 6 and one alphabet
const passwordRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$/
// We start to register our user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const resultPassword = passwordRegex.test(password)
    console.log(resultPassword);

    // We hash our password so our user's password be protected
    const hashedPassword = await bcrypt.hash(password, 12);
    // Then we save our user to the MongoDB server
    if (resultPassword) {
        try {
            await User.create({ email: email, password: hashedPassword });
            // If the user exist this message will shows because in the module we used (type:String, unique:true) so we only create one user with one unique email 
        } catch (err) {
            return res.status(400).json({
                message: "this user already exists",
            });
        }
    } else (res.status(400).json({
        message: "Email or passwork is not valid",
    }))
    res.status(201).json({
        message: `User created with email: ${email}`,
    });
});

// We gonna check if the use exist so we check by email
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }
// Then we can check if our use's password is correct then we check it also with our crypted password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }
// Then we create our token for using it in cookies
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
// Then in this part we create our cookies
    res.cookie("jwt", token, { httpOnly: true, secure: false });
    res.json({
        message: "Here your cookies)",
    });
});
module.exports = router;