import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const JWT_SECRET = "your_secret_key";

// SIGNUP
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const processedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: processedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email: processedEmail,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const processedEmail = email.trim().toLowerCase();
    console.log("Incoming email:", email);
    console.log("Processed email:", processedEmail);

    const user = await User.findOne({ email: processedEmail });
    console.log("User found:", user ? "Yes" : "No", user ? user.email : "");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PROTECTED ROUTE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    res.json({
      message: "Protected route working",
      user
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE PROFILE
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const updateData = { firstName, lastName };
    if (email) {
      updateData.email = email.trim().toLowerCase();
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;