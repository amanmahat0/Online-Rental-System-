import React, { useState, useContext } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { UserContext, RoleContext } from "../../Context/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    confirmPassword: "",
    userType: "user", // Default to 'user'
    companyName: "", // Only used if userType is 'agent'
    address: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const { setRole } = useContext(RoleContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
    } else {
      setError("");
      // Prepare form data based on user type
      const formBody =
        formData.userType === "user"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              contact: formData.contact,
            }
          : formData.userType === "agent"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              contact: formData.contact,
              companyName: formData.companyName,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              address: formData.address,
              contact: formData.contact,
            };
      try {
        console.log(formBody);
        // Send form data to backend
        const response = await fetch(
          `http://localhost:5000/api/${formData.userType}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formBody),
          }
        );
        const data = await response.json();
        console.log(data);
        // Check if response is successful
        if (response.status === 200) {
          console.log(data);
          // Check if user is successfully registered
          // If successful, set user context and redirect to home page
          if (data.status === true) {
            setUser(data.data);
            setRole(formData.userType);
            navigate("/");
          }
        } else {
          setError("Invalid credentials. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join our rental community</p>

        {error !== "" && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="form-group">
            <div className="radio-group">
              <div>
                <input
                  type="radio"
                  id="role-user"
                  name="userType"
                  value="user"
                  checked={formData.userType === "user"}
                  onChange={handleChange}
                />
                <label htmlFor="role-user">User</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role-agent"
                  name="userType"
                  value="agent"
                  checked={formData.userType === "agent"}
                  onChange={handleChange}
                />
                <label htmlFor="role-agent">Agent</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role-owner"
                  name="userType"
                  value="owner"
                  checked={formData.userType === "owner"}
                  onChange={handleChange}
                />
                <label htmlFor="role-owner">Owner</label>
              </div>
            </div>
            <div
              className={`${formData.userType}-selected selected-radio-line`}
            ></div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
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
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={(e) => {
                // Allow only numbers and limit to 10 digits
                if (/^\d{0,10}$/.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              placeholder="Enter your contact number"
              required
            />
          </div>

          {/* Conditional Company Name Field */}
          {(formData.userType === "agent" || formData.userType === "owner") && (
            <div className="form-group">
              <label htmlFor="companyName">
                {formData.userType === "agent"
                  ? "Company Name(optional)"
                  : "Address"}
              </label>
              <input
                type="text"
                id="companyName"
                name={formData.userType === "agent" ? "companyName" : "address"}
                value={
                  formData.userType === "agent"
                    ? formData.companyName
                    : formData.address
                }
                onChange={handleChange}
                placeholder={
                  formData.userType === "agent"
                    ? "Enter your company name"
                    : "Enter your address"
                }
              />
            </div>
          )}

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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
