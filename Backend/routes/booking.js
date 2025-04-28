const express = require("express");
const router = express.Router();
const db = require("../config/db"); 

// POST /api/bookings/:busId
router.post("/:busId", async (req, res) => {
  const { seat, passenger_name, passenger_email, passenger_phone, age } = req.body;
  const { busId } = req.params;

  if (!seat || !passenger_name || !passenger_email || !passenger_phone || !age) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const sql = `
      INSERT INTO bookings (bus_id, seat_number, passenger_name, passenger_email, passenger_phone, age)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await db.query(sql, [
      busId,
      seat,
      passenger_name,
      passenger_email,
      passenger_phone,
      age,
    ]);

    res.status(201).json({ message: "Booking successful", bookingId: Date.now() }); 
  } catch (error) {
    console.error("Booking insert error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;
