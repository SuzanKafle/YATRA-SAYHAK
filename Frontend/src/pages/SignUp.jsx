import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setSuccess(response.data.message);
      setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "user" });
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <style>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #1a1a1a;
          color: #fff;
        }
        .signup-background {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: calc(100vh - 60px - 60px);
          background-color: #1a1a1a;
        }
        .form-wrapper {
          background: rgba(0, 0, 0, 0.85);
          padding: 3rem 2.5rem;
          border-radius: 12px;
          max-width: 600px;
          width: 90%;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        .subtitle {
          font-size: 1.1rem;
          color: #ccc;
          margin-bottom: 2rem;
        }
        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .input-field {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 1rem;
          background: #2b2b2b;
          color: #fff;
        }
        .input-field:focus {
          outline: none;
          border-color: #4caf50;
          background: #3a3a3a;
        }
        .signup-button {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 8px;
          background: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .signup-button:hover:not(:disabled) {
          background: #43a047;
        }
        .signup-button:disabled {
          background: #2e7d32;
          cursor: not-allowed;
          opacity: 0.6;
        }
        .spinner {
          border: 2px solid #fff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error-message {
          color: #f87171;
          background: rgba(248, 113, 113, 0.1);
          padding: 10px;
          border-radius: 6px;
        }
        .success-message {
          color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
          padding: 10px;
          border-radius: 6px;
        }
        .link {
          color: #90ee90;
          text-decoration: none;
          font-weight: 500;
        }
        .link:hover {
          text-decoration: underline;
        }
        .link-text {
          margin-top: 1.5rem;
          color: #ccc;
          font-size: 0.9rem;
        }
      `}</style>

      <Navbar />

      <div className="signup-background">
        <div className="form-wrapper">
          <h2 className="title">Sign Up into Yatra Sayahak</h2>
          <h3 className="subtitle">Sign up to book your journey!</h3>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            {["name", "email", "password", "confirmPassword"].map((field, idx) => (
              <input
                key={idx}
                type={field.includes("password") ? "password" : field}
                name={field}
                placeholder={
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={formData[field]}
                onChange={handleChange}
                className="input-field"
                required
                disabled={loading}
              />
            ))}

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span> Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <p className="link-text">
            Already a member? <Link to="/login" className="link">Login</Link>
          </p>
          <p className="link-text">
            Are you an admin? <Link to="/admin/signup" className="link">Admin Signup</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
