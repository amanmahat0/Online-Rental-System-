import { useState } from "react";
import "../styles/adminlogin.css";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null); // null, "success", or "error"
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log("Login successful");
      setLoginStatus("success");
      setTimeout(() => {
        navigate("/admin/home");
      }, 2000); // Redirect after 2 seconds
    } else {
      console.log("Login failed");
      setLoginStatus("error");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-background"></div>
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {/* Display login status messages */}
        {loginStatus === "success" && (
          <div className="login-success">
            Login successful! Redirecting...
          </div>
        )}
        {loginStatus === "error" && (
          <div className="login-error">
            Invalid credentials. Please try again.
          </div>
        )}

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;