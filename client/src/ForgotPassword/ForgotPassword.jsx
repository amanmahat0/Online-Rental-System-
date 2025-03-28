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
      }
      if (response.status === 500) {
        setError("server error");
      }
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

  // Password update with backend integration
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Client-side password validations
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
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
        alert("Password updated successfully!");
        // Reset form or redirect
        setCurrentStep(1);
        setemail("");
        setOtp(["", "", "", "", "", ""]);
        setNewPassword("");
        setConfirmPassword("");
        navigate("/login");
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
          <div>Loading...</div>
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
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
