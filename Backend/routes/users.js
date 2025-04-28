const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Failed to fetch users:", err);
      res.status(500).json({ message: "Failed to fetch users: " + err.message });
    } else {
      res.status(200).json(results);
    }
  });
});


// DELETE user by ID
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("Failed to delete user:", err);
      return res.status(500).json({ message: "Failed to delete user: " + err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  });
});


module.exports = router;
