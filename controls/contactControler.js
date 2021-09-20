const Contact= require("../models/contact")
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// list of all contact
const getContact=async (req,res)=>{
  const query = req.query;
  const userId = req.cookies.jwtData.id
  const objecjKey = Object.keys(query)[0];
  const objectValue= Object.values(query)[0];
  const contacts = await Contact.find({ userId: userId }).populate('userId');
  const findContacts = await Contact.find ({[objecjKey]:[objectValue]})
   console.log(objecjKey)
   console.log(findContacts)
    res.json({
		status: "OK",
		message:"All contact list",
        data: findContacts
	});

}

// Adding a contact
const addContact=async (req,res)=>{
    const addContacts =await Contact.create(req.body)
    res.json({
		status: "OK",
		message:"contact added",
        data: addContacts
	});

}
// changing contacts information
const changeContact=async(req,res)=>{

          const contactID = req.params.id
          const { userId, name, email, description, category } = req.body;
          try{
          await Contact.findOneAndUpdate( contactID, { userId, name, email, description, category })
            
            res.json({
                message: "contact updated"
            })
          }
          catch (err) {
            return res.status(400).json({
              message: " user created",
            });}
     
}

// Deleting a contact
const deleteContact=async(req,res)=>{
  const contactID=req.params.id
  const removecontact=await Contact.deleteOne({_id:contactID})
  if(Contact){
      res.json({
          status:"ok",
          message:"Contact deleted",
          data: removecontact
      })
  }
}

// Login
const addlogin = async(req,res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email: email })
  try {
      const passwordValid = await bcrypt.compare(password, user.password);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("jwt", token, { httpOnly: true, secure: false });

      res.json({massage:"user match"})
  } catch (error) {
    

      res.json({ errorMessage: "search key not validate" })
  }
}

// Register a user
const passwordValid = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/;
 const addregister = async(req,res)=>{
    const { email, password } = req.body;
    const passwordTest= passwordValid.test(password)
    const userPassword = await bcrypt.hash(password, 12);
   if(passwordTest){
    try {
		await User.create({ email: email, password: userPassword });
        res.json("User added",)
	} 
    catch (err) {
		return res.status(400).json({
			message: " user been created",
		});
	}}
  else {
    res.status(400).json({
      message: " enter a valid email or password",
    });
  }
 }

// exporting
module.exports ={
  getContact,
  addContact,
  changeContact,
  deleteContact,
  addlogin,
  addregister
   
    
}