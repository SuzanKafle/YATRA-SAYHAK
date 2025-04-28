const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get available seats for a specific bus

router.get("/:busId", (req, res) => {
  const busId = req.params.busId;

  const query = "SELECT seat_number, is_booked FROM seats WHERE bus_id = ?";
  db.query(query, [busId], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching seats" });
    if (results.length === 0) return res.status(404).json({ message: "No seats found for this bus" });

    return res.status(200).json(results);  // Return seat_number and is_booked for each seat
  });
});

module.exports = router;
