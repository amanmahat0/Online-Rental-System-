import React, { useState, useContext } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { UserContext, RoleContext } from "../../Context/UserContext";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    confirmPassword: "",
    userType: "User", // Default to 'user'
    companyName: "", // Only used if userType is 'agent'
    address: "",
  });
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const { setRole } = useContext(RoleContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation function
  const isPasswordStrong = (password) => {
    // Minimum 8 chars, at least 1 uppercase, 1 number, 1 special char
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  };

  // Password requirement checks for live feedback
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Contact number must be exactly 10 digits
    if (formData.contact.length !== 10) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }
    // Password strength check
    if (!isPasswordStrong(formData.password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
    } else {
      setError("");
      // Prepare form data based on user type
      const formBody =
        formData.userType === "User"
          ? {
              name: formData.name,
              email: formData.email,
              password: formData.password,
              contact: formData.contact,
            }
          : formData.userType === "Agent"
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
            localStorage.setItem("user", JSON.stringify(data.data));
            localStorage.setItem("role", formData.userType);
            setUser(data.data);
            setRole(formData.userType);
            navigate("/");
          }
        } else if (response.status === 400) {
          setError("Email already exists. Please use a different email.");
        } else {
          setError("Internal server error. Please try again later.");
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
                  value="User"
                  checked={formData.userType === "User"}
                  onChange={handleChange}
                />
                <label htmlFor="role-user">User</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role-agent"
                  name="userType"
                  value="Agent"
                  checked={formData.userType === "Agent"}
                  onChange={handleChange}
                />
                <label htmlFor="role-agent">Agent</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="role-owner"
                  name="userType"
                  value="Owner"
                  checked={formData.userType === "Owner"}
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

          <div className="form-group" style={{ position: 'relative' }}>
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
              style={{ paddingRight: '2.2rem' }}
            />
            {formData.contact.length === 10 && (
              <span
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '38px',
                  color: 'green',
                  fontSize: '1.2rem',
                  pointerEvents: 'none',
                }}
              >
                <FaCheck />
              </span>
            )}
          </div>

          {/* Conditional Company Name Field */}
          {(formData.userType === "Agent" || formData.userType === "Owner") && (
            <div className="form-group">
              <label htmlFor="companyName">
                {formData.userType === "Agent"
                  ? "Company Name(optional)"
                  : "Address"}
              </label>
              <input
                type="text"
                id="companyName"
                name={formData.userType === "Agent" ? "companyName" : "address"}
                value={
                  formData.userType === "Agent"
                    ? formData.companyName
                    : formData.address
                }
                onChange={handleChange}
                placeholder={
                  formData.userType === "Agent"
                    ? "Enter your company name"
                    : "Enter your address"
                }
              />
            </div>
          )}

          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '38px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#888'
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <ul className="password-checklist">
              <li style={{color: passwordChecks.length ? 'green' : 'red'}}>
                {passwordChecks.length ? '✔️' : '❌'} Minimum 8 characters
              </li>
              <li style={{color: passwordChecks.uppercase ? 'green' : 'red'}}>
                {passwordChecks.uppercase ? '✔️' : '❌'} At least 1 uppercase letter
              </li>
              <li style={{color: passwordChecks.number ? 'green' : 'red'}}>
                {passwordChecks.number ? '✔️' : '❌'} At least 1 number
              </li>
              <li style={{color: passwordChecks.special ? 'green' : 'red'}}>
                {passwordChecks.special ? '✔️' : '❌'} At least 1 special character
              </li>
            </ul>
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '38px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '#888'
              }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
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
