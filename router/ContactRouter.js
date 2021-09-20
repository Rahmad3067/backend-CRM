const express = require("express")
const router = express.Router()
const { getContact,addContact,changeContact,deleteContact} = require("../controls/contactControler")
const{protect}=require("../midelware/protect")
const { addlogin} = require("../controls/contactControler")
const {addregister} = require("../controls/contactControler");

router.get("/",protect,getContact)
router.post("/",protect,addContact)
router.put("/:id",changeContact)
router.delete("/:id",protect,deleteContact)
router.post("/",addlogin )
router.post("/", addregister);

module.exports = router