import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext, RoleContext } from "../../Context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const { setRole } = useContext(RoleContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email.includes("@")) {
      return setError("Please enter a valid email address.");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    console.log("Form Data Before Sending: ", formData);
    const sendFormData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/api/${formData.role}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendFormData),
        }
      );
      console.log("JSON Sent to Backend: " + JSON.stringify(sendFormData));
      console.log("response status: " + response.status);
      const data = await response.json();
      if (response.status === 200) {
        console.log("Data Received: ", data);
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("role", formData.role);
        setUser(data.data);
        setRole(formData.role);
        if (formData.role === "user") {
          return navigate("/");
        } else if (formData.role === "agent") {
          return navigate("/agent/profile");
        } else if (formData.role === "owner") {
          return navigate("/owner/profile");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your rental account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="radio-group">
              <div>
                <input
                  type="radio"
                  id="role-user"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                <label htmlFor="role-user">User</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role-agent"
                  name="role"
                  value="agent"
                  checked={formData.role === "agent"}
                  onChange={handleChange}
                />
                <label htmlFor="role-agent">Agent</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role-owner"
                  name="role"
                  value="owner"
                  checked={formData.role === "owner"}
                  onChange={handleChange}
                />
                <label htmlFor="role-owner">Owner</label>
              </div>
            </div>
            <div
              className={`${formData.role}-selected selected-radio-line`}
            ></div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <NavLink to="/forgot-password" className="forgot-password">
          <span>Forgot Password ?</span>
        </NavLink>

        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
