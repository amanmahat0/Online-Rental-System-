import React, { useState, useContext } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "role") {
      setIsUserSelected(e.target.value === "user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      if (response.status === 200) {
        const data = await response.json();
        console.log("Data Received: ", data);
        setUser(data);
        return navigate("/");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Invalid email or password");
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
            </div>
            <div
              className={`${
                isUserSelected ? "user-selected" : "agent-selected"
              } selected-radio-line`}
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
            Login
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
