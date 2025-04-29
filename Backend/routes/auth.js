import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Login
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // For simplicity, just return a "logged in" flag
    res.status(200).json({ message: "Login successful", user: { username: user.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout - since it's frontend-managed, you can skip an API for logout in simple cases
// You can add sessions or JWTs later if you need persistent login.

export default router;
