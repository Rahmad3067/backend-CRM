const express = require("express")
const router = express.Router()
const { getContact,addContact,changeContact,deleteContact} = require("../controls/contactControler")
const{protect}=require("../midelware/protect")
const { addlogin} = require("../controls/contactControler")
const {addregister} = require("../controls/contactControler");






router.get("/contact", protect,getContact)
router.post("/contact", protect,addContact)
router.put("/contact/:id",changeContact)
router.delete("/contact/:id",protect,deleteContact)
router.post("/login",addlogin )
router.post("/register", addregister);







module.exports = router