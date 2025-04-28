const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/adminAuth");
const userRoutes = require("./routes/users");
const busesRoutes = require("./routes/buses");
const seatsRoutes = require("./routes/seats");
const bookingRoutes = require("./routes/booking"); 

// Middleware
app.use(cors());
app.use(express.json());

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/buses", busesRoutes);
app.use("/api/seats", seatsRoutes);
app.use("/api/bookings", bookingRoutes);  
app.use("/uploads", express.static("uploads"));


// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
