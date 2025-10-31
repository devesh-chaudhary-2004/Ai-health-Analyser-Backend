import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      age: age || null,
      gender: gender || null,
    });

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Return user without password
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height || 0,
      weight: user.weight || 0,
      lifestyle: user.lifestyle || "",
    };

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // Return user without password
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height || 0,
      weight: user.weight || 0,
      lifestyle: user.lifestyle || "",
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const user = await User.findById(userId).select("-password -confirmPassword");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height || 0,
      weight: user.weight || 0,
      lifestyle: user.lifestyle || "",
    };

    res.status(200).json({ success: true, user: userResponse });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const updates = req.body;

    // Remove password from updates if present
    delete updates.password;
    delete updates.confirmPassword;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password -confirmPassword");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      height: user.height || 0,
      weight: user.weight || 0,
      lifestyle: user.lifestyle || "",
    };

    res.status(200).json({ success: true, message: "Profile updated successfully", user: userResponse });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

