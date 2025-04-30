import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); n
    }
  }, [navigate]);

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f0f4f8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "7rem",
    },
    card: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      maxWidth: "500px",
      width: "90%",
      textAlign: "center",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#16a34a",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.5rem",
      margin: "0 auto 1rem",
    },
    name: {
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
    },
    email: {
      fontSize: "1.1rem",
      color: "#555",
      marginBottom: "1.5rem",
    },
    role: {
      fontSize: "1rem",
      color: "#888",
      marginBottom: "2rem",
    },
    editButton: {
      padding: "10px 20px",
      borderRadius: "6px",
      backgroundColor: "#4caf50",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />

      {user && (
        <div style={styles.card}>
          <div style={styles.avatar}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div style={styles.name}>{user.name}</div>
          <div style={styles.email}>{user.email}</div>
          <div style={styles.role}>Role: {user.role || "User"}</div>
          <button style={styles.editButton} onClick={() => alert("Coming Soon!")}>
            Edit Profile
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
