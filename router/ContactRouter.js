const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');


// Protect function for our other functions
function protect (req, res, next) {
    try{
        const data = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.cookies.jwtData = data;
        next();
    } catch ( err ) {
        return res.status(401).json({
            message : "Your token is not valid",
        });
    }
}

// With these functions we can search by user name and email or category
router.get('/', protect, async (req, res) => {
    const userId = req.cookies.jwtData.id
    const key = Object.keys(req.query)[0]
    const value = Object.values(req.query)[0]
    if (key) {
        try {
            const contacts = await Contact.find({ userId, [key]: value }).populate('userId');
            res.json({
                data: contacts,
            })
        } catch (err) {
            return res.status(400).json({
                message: "Your search key is not validate",
            });
        }
    } else {

        try {
            const contacts = await Contact.find({ userId: userId }).populate('userId');
            res.json({
                status: 'Contact added...',
                data: contacts,
            });
        } catch (err) {
            return res.status(400).json({
                message: "Your search Key is not validate",
            });
        }
    }
});


// Start Creating the contacts and same time using the protect to protect our user 
router.post('/', protect, async (req, res) => {

    const userId = req.cookies.jwtData.id
    const { name, email, description, category } = req.body;
    try {
        await Contact.create({ userId: userId, email: email, name: name, description: description, category: category });
    } catch (err) {
        return res.status(400).json({
            message: "Couldn't create the contact",
        });
    }
    res.status(201).json({
        message: "The new Contact created",
    });
});

// From here we can modify our contacts (their name and all)
router.put('/', async (req, res) => {
    const contactName = req.query.name
    const contact = await Contact.findOne({ name: contactName });
    res.json({
        message: 'Your Contact name been changed',
    })
});

// For deleting the contact we can use with this method
router.delete('/', async (req, res) => {
    const contactName = req.query.name
    const contact = await Contact.deleteOne({ name: contactName });
    res.json({
        message: 'You succecfully deleted a contact',
    });
});


module.exports = router;