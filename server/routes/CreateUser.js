const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser'); // Ensure cookie-parser is used
const { body, validationResult } = require('express-validator');

dotenv.config();
router.use(cookieParser()); // Use cookie-parser middleware

// Signup route with validation
router.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('location').optional().notEmpty().withMessage('Location is required if provided'),
], async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name, // Changed from username to name
            email,
            password: hashedPassword,
            location // Added the location field
        });

        await newUser.save();
        return res.status(201).json({ status: true, message: 'Record registered' });
    } catch (error) {
        console.error(error); // Logging error for debugging
        return res.status(500).json({ message: 'Server error' });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User is not registered' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Password is incorrect' });
        }


        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Log the token to the console
        // console.log('Generated JWT Token:', token);


        res.cookie('token', token, { httpOnly: false, maxAge: 3600000 });



        // Send success response without token
        return res.status(200).json({ status: true, message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
