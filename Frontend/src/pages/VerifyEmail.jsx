// Frontend/src/pages/VerifyEmail.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setError("No verification token provided");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify-email`, {
          params: { token },
        });
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 5173); // Redirect to login after 3 seconds
      } catch (err) {
        setError(err.response?.data?.message || "Email verification failed");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1 p-6 mt-20 text-center">
        <h1 className="text-3xl font-bold text-green-500 mb-6">Email Verification</h1>
        {error && <div className="text-red-500 bg-red-100 p-4 rounded-lg mb-6">{error}</div>}
        {message && <div className="text-green-500 bg-green-100 p-4 rounded-lg mb-6">{message}</div>}
        {message && <p>Redirecting to login...</p>}
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;