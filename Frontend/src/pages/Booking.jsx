import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";





const Booking = () => {
  const { busId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState("");
  const [passenger, setPassenger] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.get(`${apiUrl}/api/seats/${busId}`);
        setSeats(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load seats.");
      }
    };

    fetchSeats();
  }, [busId]);

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  // const handleBooking = async () => {
  //   if (!selectedSeat || !passenger.name || !passenger.email || !passenger.phone || !passenger.age) {
  //     setError("Please fill all fields and select a seat.");
  //     return;
  //   }

  //   try {
  //     const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  //     const res = await axios.post(`${apiUrl}/api/bookings/${busId}`, {
  //       seat: selectedSeat,
  //       passenger_name: passenger.name,
  //       passenger_email: passenger.email,
  //       passenger_phone: passenger.phone,
  //       age: passenger.age,
  //     });

  //     setMessage("Booking successful! Booking ID: " + res.data.bookingId);
  //     setError("");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Booking failed.");
  //   }
  // };

  const navigate = useNavigate();
  const handleBooking = async () => {
    if (!selectedSeat || !passenger.name || !passenger.email || !passenger.phone || !passenger.age) {
      setError("Please fill all fields and select a seat.");
      return;
    }
  
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/bookings/${busId}`, {
        seat: selectedSeat,
        passenger_name: passenger.name,
        passenger_email: passenger.email,
        passenger_phone: passenger.phone,
        age: passenger.age,
      });
  
      const bookingId = res.data.bookingId;
      setError("");
      setMessage("Booking successful! Redirecting to payment...");
  
      // Navigate to PaymentPage with state
      navigate("/paymentpage/:bookingId/:amount", {
        state: {
          bookingId,
          seat: selectedSeat,
          passenger,
        },
      });
  
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h2 className="text-2xl font-semibold mb-4">Seat Booking</h2>
      {error && <p className="text-red-600">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      <div className="mb-4 grid grid-cols-4 gap-4">
        {seats.map((seat) => (
          <button
            key={seat.seat_number}
            disabled={seat.is_booked}
            className={`px-3 py-2 rounded border 
              ${seat.is_booked ? "bg-gray-300 cursor-not-allowed" : selectedSeat === seat.seat_number ? "bg-blue-600 text-white" : "bg-white"}`}
            onClick={() => setSelectedSeat(seat.seat_number)}
          >
            {seat.seat_number}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="name" placeholder="Name" className="p-2 border rounded" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="p-2 border rounded" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" className="p-2 border rounded" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" className="p-2 border rounded" onChange={handleChange} />
      </div>

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
