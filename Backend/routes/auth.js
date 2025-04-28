// Backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Register a new user with email verification
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, password, role, verified) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, email, hashedPassword, role || "user", false], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email or username already exists" });
        }
        return res.status(500).json({ message: "Server error" });
      }

      const userId = result.insertId;
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const tokenQuery = "INSERT INTO tokens (user_id, token, expires_at) VALUES (?, ?, ?)";
      db.query(tokenQuery, [userId, token, expiresAt], (tokenErr) => {
        if (tokenErr) {
          console.error("Error saving token:", tokenErr);
          return res.status(500).json({ message: "Server error" });
        }

        const verificationUrl = `http://localhost:5173/verify-email?token=${token}`;
        const html = `
          <h1>Welcome to Yatra Sayahak!</h1>
          <p>Please verify your email by clicking the link below:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        `;

        console.log(`Attempting to send email to: ${email}`);
        sendEmail(email, "Verify Your Email - Yatra Sayahak", html, (emailErr) => {
          if (emailErr) {
            console.error("Email sending failed:", emailErr);
            return res.status(500).json({ message: "Failed to send verification email" });
          }
          console.log(`Email sent successfully to: ${email}`);
          res.status(201).json({
            message: "User registered successfully. Please check your email to verify your account.",
          });
        });
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify email
router.get("/verify-email", (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }

  const tokenQuery = "SELECT * FROM tokens WHERE token = ? AND expires_at > NOW()";
  db.query(tokenQuery, [token], (err, results) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const userId = results[0].user_id;
    const updateQuery = "UPDATE users SET verified = TRUE WHERE id = ?";
    db.query(updateQuery, [userId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating user verification:", updateErr);
        return res.status(500).json({ message: "Server error" });
      }

      const deleteQuery = "DELETE FROM tokens WHERE token = ?";
      db.query(deleteQuery, [token], (deleteErr) => {
        if (deleteErr) {
          console.error("Error deleting token:", deleteErr);
          return res.status(500).json({ message: "Server error" });
        }

        res.status(200).json({ message: "Email verified successfully. You can now log in." });
      });
    });
  });
});
// Backend/routes/auth.js
// ... (previous code)

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // Check if the user is verified
      if (!user.verified) {
        return res.status(400).json({ message: "Please verify your email before logging in" });
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "mysecretkey123", // Use an environment variable in production
        { expiresIn: "1h" }
      );

      res.status(200).json({ token, message: "Login successful" });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

