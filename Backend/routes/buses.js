const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Create a new bus and generate seats
router.post("/", (req, res) => {
  const { busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats,  departureDate} = req.body;

  if (!busName || !routeFrom || !routeTo || !departureTime || !arrivalTime || !price || !availableSeats || !departureDate  ) {
    return res.status(400).json({ message: "All fields, including image, are required" });
  }

  const query =
    "INSERT INTO buses (bus_name, route_from, route_to, departure_time, arrival_time, price, available_seats, departure_date ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, )";
  db.query(
    query,
    [busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate ],
    (err, result) => {
      if (err) {
        console.error("Error adding bus:", err);
        return res.status(500).json({ message: "Server error" });
      }

      const busId = result.insertId;
      const totalSeats = parseInt(availableSeats);
      const seatLabels = ['A', 'B', 'C', 'D'];
      const seatsToInsert = [];

      // Generate seats (eg, A1 to A5, B1 to B5, etc.)
      for (let i = 0; i < seatLabels.length; i++) {
        for (let j = 1; j <= Math.ceil(totalSeats / seatLabels.length); j++) {
          if (seatsToInsert.length < totalSeats) {
            seatsToInsert.push([busId, `${seatLabels[i]}${j}`, false]);
          }
        }
      }

      const seatQuery = "INSERT INTO seats (bus_id, seat_number, is_booked) VALUES ?";
      db.query(seatQuery, [seatsToInsert], (seatErr) => {
        if (seatErr) {
          console.error("Error adding seats:", seatErr);
          return res.status(500).json({ message: "Server error while adding seats" });
        }
        res.status(201).json({ message: "Bus added successfully", busId });
      });
    }
  );
});

// Reading all buses
router.get("/", (req, res) => {
  const query = "SELECT * FROM buses";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching buses:", err);
      return res.status(500).json({ message: "Server error" });
    }
    const transformedBuses = results.map((bus) => ({
      id: bus.id,
      name: bus.bus_name,
      route: `${bus.route_from} to ${bus.route_to}`,
      available_seats: bus.available_seats,
      departure_time: bus.departure_time,
      arrival_time: bus.arrival_time,
      departure_date: bus.departure_date,
      price: bus.price,
      
      
    }));
    res.status(200).json(transformedBuses);
  });
});

// Updating a bus
router.put("/:id", (req, res) => {
  const busId = req.params.id;
  const { busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate} = req.body;

  if (!busName || !routeFrom || !routeTo || !departureTime || !arrivalTime || !price || !availableSeats || !departureDate  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "UPDATE buses SET bus_name = ?, route_from = ?, route_to = ?, departure_time = ?, arrival_time = ?, price = ?, available_seats = ?, departure_date = ? WHERE id = ?";
  db.query(
    query,
    [busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate, busId],
    (err, result) => {
      if (err) {
        console.error("Error updating bus:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Bus not found" });
      }
      res.status(200).json({ message: "Bus updated successfully" });
    }
  );
});

// Deleting a bus
router.delete("/:id", (req, res) => {
  const busId = req.params.id;

  const query = "DELETE FROM buses WHERE id = ?";
  db.query(query, [busId], (err, result) => {
    if (err) {
      console.error("Error deleting bus:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus deleted successfully" });
  });
});


// Read all buses with optional departure date filter
router.get("/", (req, res) => {
  const { departure_date } = req.query;  // Get the filter from query params

  let query = "SELECT * FROM buses";
  const params = [];

  if (departure_date) {
    query += " WHERE departure_date = ?";
    params.push(departure_date);  // Pass the filter to the query
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching buses:", err);
      return res.status(500).json({ message: "Server error" });
    }
    const transformedBuses = results.map((bus) => ({
      id: bus.id,
      name: bus.bus_name,
      route: `${bus.route_from} to ${bus.route_to}`,
      available_seats: bus.available_seats,
      departure_time: bus.departure_time,
      arrival_time: bus.arrival_time,
      departure_date: bus.departure_date,
      price: bus.price,
    }));
    res.status(200).json(transformedBuses);
  });
});


// Booking a seat
router.post("/booking/:busId", (req, res) => {
  const busId = req.params.busId;
  const { seat, name, email } = req.body;

  if (!seat || !name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the seat is already booked
  const seatQuery = "SELECT * FROM seats WHERE bus_id = ? AND seat_number = ?";
  db.query(seatQuery, [busId, seat], (err, results) => {
    if (err) {
      console.error("Error checking seat:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0 || results[0].is_booked) {
      return res.status(400).json({ message: "Seat is already booked" });
    }

    // Mark the seat as booked
    const updateSeatQuery = "UPDATE seats SET is_booked = true WHERE bus_id = ? AND seat_number = ?";
    db.query(updateSeatQuery, [busId, seat], (updateErr) => {
      if (updateErr) {
        console.error("Error updating seat:", updateErr);
        return res.status(500).json({ message: "Server error" });
      }

      // Save booking details (optional, you can add more fields like booking_time)
      const bookingQuery = "INSERT INTO bookings (bus_id, seat_number, name, email) VALUES (?, ?, ?, ?)";
      db.query(bookingQuery, [busId, seat, name, email], (bookingErr, bookingResult) => {
        if (bookingErr) {
          console.error("Error saving booking:", bookingErr);
          return res.status(500).json({ message: "Booking failed" });
        }

        res.status(201).json({ message: "Booking confirmed", bookingId: bookingResult.insertId });
      });
    });
  });
});

module.exports = router;
// this baove code works hai tw 



// const express = require("express");
// const router = express.Router();
// const db = require("../config/db");

// // Create a new bus and generate seats
// router.post("/", (req, res) => {
//   const { busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate, image_url } = req.body;

//   if (!busName || !routeFrom || !routeTo || !departureTime || !arrivalTime || !price || !availableSeats || !departureDate || !image_url) {
//     return res.status(400).json({ message: "All fields, including image, are required" });
//   }

//   const query =
//     "INSERT INTO buses (bus_name, route_from, route_to, departure_time, arrival_time, price, available_seats, departure_date, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//   db.query(
//     query,
//     [busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate, image_url],
//     (err, result) => {
//       if (err) {
//         console.error("Error adding bus:", err);
//         return res.status(500).json({ message: "Server error" });
//       }

//       const busId = result.insertId;
//       const totalSeats = parseInt(availableSeats);
//       const seatLabels = ['A', 'B', 'C', 'D'];
//       const seatsToInsert = [];

//       for (let i = 0; i < seatLabels.length; i++) {
//         for (let j = 1; j <= Math.ceil(totalSeats / seatLabels.length); j++) {
//           if (seatsToInsert.length < totalSeats) {
//             seatsToInsert.push([busId, `${seatLabels[i]}${j}`, false]);
//           }
//         }
//       }

//       const seatQuery = "INSERT INTO seats (bus_id, seat_number, is_booked) VALUES ?";
//       db.query(seatQuery, [seatsToInsert], (seatErr) => {
//         if (seatErr) {
//           console.error("Error adding seats:", seatErr);
//           return res.status(500).json({ message: "Server error while adding seats" });
//         }
//         res.status(201).json({ message: "Bus added successfully", busId });
//       });
//     }
//   );
// });

// // Read all buses (with optional filter)
// router.get("/", (req, res) => {
//   const { departure_date } = req.query;
//   let query = "SELECT * FROM buses";
//   const params = [];

//   if (departure_date) {
//     query += " WHERE departure_date = ?";
//     params.push(departure_date);
//   }

//   db.query(query, params, (err, results) => {
//     if (err) {
//       console.error("Error fetching buses:", err);
//       return res.status(500).json({ message: "Server error" });
//     }
//     const transformedBuses = results.map((bus) => ({
//       id: bus.id,
//       name: bus.bus_name,
//       route: `${bus.route_from} to ${bus.route_to}`,
//       available_seats: bus.available_seats,
//       departure_time: bus.departure_time,
//       arrival_time: bus.arrival_time,
//       departure_date: bus.departure_date,
//       price: bus.price,
//       image_url: bus.image_url,
//     }));
//     res.status(200).json(transformedBuses);
//   });
// });

// // Update a bus
// router.put("/:id", (req, res) => {
//   const busId = req.params.id;
//   const { busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate, image_url } = req.body;

//   if (!busName || !routeFrom || !routeTo || !departureTime || !arrivalTime || !price || !availableSeats || !departureDate || !image_url) {
//     return res.status(400).json({ message: "All fields are required including image" });
//   }

//   const query =
//     "UPDATE buses SET bus_name = ?, route_from = ?, route_to = ?, departure_time = ?, arrival_time = ?, price = ?, available_seats = ?, departure_date = ?, image_url = ? WHERE id = ?";
//   db.query(
//     query,
//     [busName, routeFrom, routeTo, departureTime, arrivalTime, price, availableSeats, departureDate, image_url, busId],
//     (err, result) => {
//       if (err) {
//         console.error("Error updating bus:", err);
//         return res.status(500).json({ message: "Server error" });
//       }
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Bus not found" });
//       }
//       res.status(200).json({ message: "Bus updated successfully" });
//     }
//   );
// });

// // Delete a bus
// router.delete("/:id", (req, res) => {
//   const busId = req.params.id;

//   const query = "DELETE FROM buses WHERE id = ?";
//   db.query(query, [busId], (err, result) => {
//     if (err) {
//       console.error("Error deleting bus:", err);
//       return res.status(500).json({ message: "Server error" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Bus not found" });
//     }
//     res.status(200).json({ message: "Bus deleted successfully" });
//   });
// });

// // Book a seat
// router.post("/booking/:busId", (req, res) => {
//   const busId = req.params.busId;
//   const { seat, name, email } = req.body;

//   if (!seat || !name || !email) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const seatQuery = "SELECT * FROM seats WHERE bus_id = ? AND seat_number = ?";
//   db.query(seatQuery, [busId, seat], (err, results) => {
//     if (err) {
//       console.error("Error checking seat:", err);
//       return res.status(500).json({ message: "Server error" });
//     }

//     if (results.length === 0 || results[0].is_booked) {
//       return res.status(400).json({ message: "Seat is already booked" });
//     }

//     const updateSeatQuery = "UPDATE seats SET is_booked = true WHERE bus_id = ? AND seat_number = ?";
//     db.query(updateSeatQuery, [busId, seat], (updateErr) => {
//       if (updateErr) {
//         console.error("Error updating seat:", updateErr);
//         return res.status(500).json({ message: "Server error" });
//       }

//       const bookingQuery = "INSERT INTO bookings (bus_id, seat_number, name, email) VALUES (?, ?, ?, ?)";
//       db.query(bookingQuery, [busId, seat, name, email], (bookingErr, bookingResult) => {
//         if (bookingErr) {
//           console.error("Error saving booking:", bookingErr);
//           return res.status(500).json({ message: "Booking failed" });
//         }

//         res.status(201).json({ message: "Booking confirmed", bookingId: bookingResult.insertId });
//       });
//     });
//   });
// });

// module.exports = router;

