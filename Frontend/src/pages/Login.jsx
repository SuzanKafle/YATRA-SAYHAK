// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx";
// import Footer from "../components/Footer.jsx";
// // import TouristBuses from "../assets/tourist-buses.jpg";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
//       localStorage.setItem("token", response.data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const styles = {
//     container: {
//       minHeight: "100vh",
//       display: "flex",
//       flexDirection: "column",
//       color: "#fff",
//       overflow: "hidden",
//       width: "100%",
//     },
//     background: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundImage:
//     "url('C:\College\FYP Yatra Sayahak Bus Ticket Booking\Frontend\src\assets\tourist-buses.jpg')",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       width: "100%",
//       minHeight: "100vh",
//       padding: "2rem",
//       boxSizing: "border-box",
//     },
//     formWrapper: {
//       backgroundColor: "rgba(0, 0, 0, 0.85)",
//       padding: "4rem 3rem",
//       borderRadius: "15px",
//       boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)",
//       width: "100%",
//       maxWidth: "600px",
//       margin: "0 auto",
//       textAlign: "center",
//       backdropFilter: "blur(10px)",
//       border: "2px solid rgba(255, 255, 255, 0.2)",
//       boxSizing: "border-box",
//     },
//     title: {
//       fontSize: "3rem",
//       fontWeight: "700",
//       color: "#fff",
//       marginBottom: "1rem",
//       textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
//     },
//     subtitle: {
//       fontSize: "1.5rem",
//       color: "#ddd",
//       marginBottom: "3rem",
//       fontWeight: "300",
//     },
//     input: {
//       width: "100%",
//       padding: "16px 20px",
//       fontSize: "1.1rem",
//       borderRadius: "10px",
//       border: "none",
//       outline: "none",
//       marginBottom: "2rem",
//       backgroundColor: "rgba(255, 255, 255, 0.1)",
//       color: "#fff",
//       transition: "all 0.3s ease",
//     },
//     inputFocus: {
//       backgroundColor: "rgba(255, 255, 255, 0.15)",
//       boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.3)",
//     },
//     button: {
//       width: "100%",
//       padding: "18px",
//       fontSize: "1.2rem",
//       fontWeight: "600",
//       borderRadius: "10px",
//       border: "none",
//       backgroundColor: "#4CAF50",
//       color: "white",
//       cursor: "pointer",
//       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//     },
//     buttonHover: {
//       backgroundColor: "#45a049",
//       transform: "translateY(-2px)",
//     },
//     buttonDisabled: {
//       backgroundColor: "#2e7d32",
//       cursor: "not-allowed",
//     },
//     errorMessage: {
//       color: "#ff4444",
//       backgroundColor: "rgba(255, 68, 68, 0.15)",
//       padding: "1rem",
//       borderRadius: "8px",
//       marginBottom: "2rem",
//       fontSize: "1rem",
//       border: "1px solid rgba(255, 68, 68, 0.3)",
//     },
//     signupLink: {
//       color: "#90EE90",
//       textDecoration: "none",
//       fontWeight: "500",
//       transition: "all 0.3s ease",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//         body {
//           font-family: 'Inter', sans-serif;
//           line-height: 1.6;
//           -webkit-font-smoothing: antialiased;
//         }
//         input:-webkit-autofill,
//         input:-webkit-autofill:hover, 
//         input:-webkit-autofill:focus {
//           -webkit-text-fill-color: white;
//           -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.1) inset;
//           transition: background-color 5000s ease-in-out 0s;
//         }
//       `}</style>

//       <Navbar />

//       <div style={styles.background}>
//         <div style={styles.formWrapper}>
//           <h1 style={styles.title}>Yatra Sayahak</h1>
//           <p style={styles.subtitle}>Login to Your Account</p>

//           {error && <div style={styles.errorMessage}>{error}</div>}

//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
//           >
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               style={styles.input}
//               required
//               disabled={loading}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               style={styles.input}
//               required
//               disabled={loading}
//             />
//             <button
//               type="submit"
//               style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p style={{ marginTop: "2rem", color: "#ccc", fontSize: "1.1rem" }}>
//             Don't have an account?{" "}
//             <Link to="/signup" style={styles.signupLink}>
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Login;





import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "admin",
      });
      setSuccess(response.data.message);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
      backgroundColor: "#red",
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px #333 inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      
      <Navbar />
      <div style={styles.background}>
        <div style={styles.formWrapper}>
          <h2 style={styles.title}>Yatra Sayahak</h2>
          <h3 style={styles.subtitle}>Create Your Admin Account</h3>

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
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p style={{ marginTop: "1.5rem", color: "#ccc", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link to="/admin/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSignup;