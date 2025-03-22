const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// SignUp Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        console.log("Received Signup Request:", req.body); // Debug Log

        // Ensure email is stored in lowercase for consistency
        const normalizedEmail = email.toLowerCase();
        console.log("Normalized Email:", normalizedEmail); // Debug Log

        // Check if the user exists in the database
        const existingUser = await User.findOne({ email: normalizedEmail });
        console.log("User Found in DB:", existingUser); // Debug Log

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword); // Debug Log

        const newUser = new User({ 
            name, 
            email: normalizedEmail, 
            phone, 
            password: hashedPassword 
        });

        await newUser.save();
        console.log("User Registered Successfully:", newUser); // Debug Log
         
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Login Route
// Login Route
router.post("/login", async (req, res) => {
    try {
        console.log("Received Login Request:", req.body);

        const { email, emailOrPhone, password } = req.body;

        // Check if email or phone is provided
        const identifier = email || emailOrPhone;
        if (!identifier || !password) {
            console.log("Email or password is missing");
            return res.status(400).json({ message: "Please enter email and password" });
        }

        console.log("Login Request Received - Email/Phone:", identifier);

        // Normalize email for consistency
        const normalizedEmail = identifier.toLowerCase();

        // Find user by email
        const user = await User.findOne({ email: normalizedEmail });
        console.log("User Found in DB:", user);

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("Login Successful, Token Generated");
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {  
                _id: user._id,  
                name: user.name,  
                email: user.email,  
                phone: user.phone  
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
