import React, { useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(null);
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  // Email submission handler with detailed validation
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check 1: Basic format validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address format");
      return;
    }

    // Check 2: Common email domain validation
    const validDomains = ["example.com", "test.com", "gmail.com"];
    const domain = email.split("@")[1];
    if (!validDomains.includes(domain)) {
      setError("Please use a valid email address");
      return;
    }

    // Check 3: Simulated backend email verification
    try {
      setIsLoading(true);

      // Simulated API call to verify email
      const response = await fetch(
        `http://localhost:5000/api/${role}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const result = await response.json();

      if (response.status === 404) {
        setError("Email not registered in our system");
        setIsLoading(false);
        return; // Stop execution if email not found
      }
      if (response.status === 500) {
        setError("server error");
        setIsLoading(false);
        return; // Stop execution if server error
      }
      
      // Only proceed to OTP step if no errors
      setData(result);
      setCurrentStep(2);
    } catch (err) {
      setError("Network error. Unable to verify email.");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP handling methods
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // OTP verification with placeholder for backend validation
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter a complete OTP");
      return;
    }

    try {
      setIsLoading(true);

      if (
        data.message.data.resetToken === otpCode &&
        Date.parse(data.message.data.resetTokenExpiry) > Date.now()
      ) {
        setCurrentStep(3);
        setError("");
      } else if (
        data.message.data.resetToken === otpCode &&
        Date.parse(data.message.data.resetTokenExpiry) < Date.now()
      ) {
        setError("OTP is Expiry. please try again");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };
    
    setPasswordValidation(validations);
    
    return Object.values(validations).every(Boolean);
  };

  // Handle password change with live validation
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    validatePassword(password);
  };

  // Password update with backend integration
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Client-side password validations
    if (!validatePassword(newPassword)) {
      setError("Password does not meet the requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const resetToken = otp.join("");
      // TODO: Replace with actual password update endpoint
      const response = await fetch(
        `http://localhost:5000/api/${role}/changePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetToken,
            newPassword,
          }),
        }
      );

      if (response.status === 200) {
        // Show success modal instead of alert
        setShowSuccessModal(true);
        
        // Set a timeout to redirect after showing the success message
        setTimeout(() => {
          // Reset form
          setCurrentStep(1);
          setemail("");
          setOtp(["", "", "", "", "", ""]);
          setNewPassword("");
          setConfirmPassword("");
          navigate("/login");
        }, 3000); // Redirect after 3 seconds
      } else {
        setError("Failed to update password. Please try again.");
      }
    } catch (err) {
      setError("Network error. Password update failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Processing your request...</p>
          </div>
        </div>
      )}
      <div className="form-wrapper">
        {currentStep === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h2>Verify Email</h2>
            <div className="form-group">
              <div className="radio-group">
                <div>
                  <input
                    type="radio"
                    id="role-user"
                    name="role"
                    value="user"
                    checked={role === "user"}
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
                    checked={role === "agent"}
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
                    checked={role === "owner"}
                    onChange={handleChange}
                  />
                  <label htmlFor="role-owner">Owner</label>
                </div>
              </div>
              <div className={`${role}-selected selected-radio-line`}></div>
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Send OTP"}
            </button>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <h2>Enter OTP</h2>
            <p className="otp-info">A 6-digit OTP has been sent to {email}</p>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="resend-otp">
              Didn't receive OTP? <span>Resend</span>
            </p>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handlePasswordUpdate}>
            <h2>Update Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={handlePasswordChange}
              required
            />
            
            {/* Password validation feedback */}
            <div className="password-requirements">
              <p className="requirement-header">Password must contain:</p>
              <ul>
                <li className={passwordValidation.minLength ? "valid" : "invalid"}>
                  At least 8 characters
                </li>
                <li className={passwordValidation.hasUpperCase ? "valid" : "invalid"}>
                  At least one uppercase letter
                </li>
                <li className={passwordValidation.hasNumber ? "valid" : "invalid"}>
                  At least one number
                </li>
                <li className={passwordValidation.hasSpecialChar ? "valid" : "invalid"}>
                  At least one special character
                </li>
              </ul>
            </div>
            
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading || !Object.values(passwordValidation).every(Boolean)}>
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;