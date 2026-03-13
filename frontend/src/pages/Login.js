import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://pg-management-system-fvqd.onrender.com/api/auth/login",
        null, 
        {
              params: {

          username: username,
          password: password
        }
      }
      );

      // store login data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);

      alert("Login Successful");

      if (res.data.role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/tenant/dashboard");
      }

    } catch (error) {
      alert("Invalid Credentials");
      console.error(error);
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>PG Management Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="ADMIN">Admin</option>
          <option value="TENANT">Tenant</option>
        </select>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          style={styles.input}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f9"
  },

  card: {
    width: "300px",
    padding: "30px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }

};

export default Login;