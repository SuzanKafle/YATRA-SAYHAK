
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
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#fff",
      backgroundColor: "#f0f0f0",
    },
    background: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1521587760476-6c30a4ab6b00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "2rem",
    },
    formWrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: "3rem 2rem",
      borderRadius: "12px",
      maxWidth: "500px",
      width: "100%",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(5px)",
      textAlign: "center",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      color: "#fff",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#ccc",
      marginBottom: "2rem",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "1.2rem",
      borderRadius: "6px",
      border: "none",
      fontSize: "1rem",
      backgroundColor: "#333",
      color: "#fff",
    },
    inputFocus: {
      backgroundColor: "#444",
      boxShadow: "0 0 6px rgba(255, 255, 255, 0.2)",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "6px",
      backgroundColor: "#4b5563",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#6b7280",
    },
    buttonDisabled: {
      backgroundColor: "#3b3b3b",
      cursor: "not-allowed",
    },
    errorMessage: {
      color: "#f87171",
      backgroundColor: "rgba(248, 113, 113, 0.2)",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "1rem",
    },
    successMessage: {
      color: "#4ade80",
      backgroundColor: "rgba(74, 222, 128, 0.2)",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "1rem",
    },
    link: {
      color: "#60a5fa",
      textDecoration: "underline",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.background}>
        <div style={styles.formWrapper}>
          <h2 style={styles.title}>Join Yatra Sayahak</h2>
          <h3 style={styles.subtitle}>Become a member to book your journey!</h3>

          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}

          <form onSubmit={handleSubmit}>
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
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
                disabled={loading}
              />
            ))}

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(loading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => !loading && Object.assign(e.target.style, styles.button)}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p style={{ marginTop: "1.5rem", color: "#ccc", fontSize: "0.9rem" }}>
            Already a member?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
          <p style={{ marginTop: "0.5rem", color: "#ccc", fontSize: "0.9rem" }}>
            Are you an admin?{" "}
            <Link to="/admin/signup" style={styles.link}>
              Admin Signup
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;


