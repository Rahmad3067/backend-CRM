const Contact= require("../model/contact")
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
		message:"data send",
        data: findContacts
	});

}

const addContact=async (req,res)=>{
    const addContacts =await Contact.create(req.body)
    res.json({
		status: "OK",
		message:"data send",
        data: addContacts
	});

}
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

const deleteContact=async(req,res)=>{
  const contactID=req.params.id
  const removecontact=await Contact.deleteOne({_id:contactID})
  if(Contact){
      res.json({
          status:"ok",
          message:"data update",
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
    

      res.json({ errorMessage: "There is a probleme " })
  }
}


// Register 
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
			message: " user created",
		});
	}}
  else {
    res.status(400).json({
      message: " enter a valid email/password",
    });
  }
 }










module.exports ={
  getContact,
  addContact,
  changeContact,
  deleteContact,
  addlogin,
  addregister
   
    
}