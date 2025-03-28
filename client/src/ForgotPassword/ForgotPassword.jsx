import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Comprehensive email validation function
  const validateEmail = async (emailToValidate) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check 1: Basic format validation
    if (!emailRegex.test(emailToValidate)) {
      setError('Please enter a valid email address format');
      return false;
    }

    // Check 2: Common email domain validation
    const invalidDomains = ['example.com', 'test.com'];
    const domain = emailToValidate.split('@')[1];
    if (invalidDomains.includes(domain)) {
      setError('Please use a valid email address');
      return false;
    }

    // Check 3: Simulated backend email verification
    try {
      setIsLoading(true);
      
      // Simulated API call to verify email
      const response = await fetch('/api/validate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToValidate })
      });

      const result = await response.json();

      // Different scenarios of email validation
      if (!result.exists) {
        setError('Email not registered in our system');
        return false;
      }

      if (result.isBlocked) {
        setError('This account has been blocked');
        return false;
      }

      if (!result.isVerified) {
        setError('Email account is not verified');
        return false;
      }

      return true;
    } catch (err) {
      setError('Network error. Unable to verify email.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Email submission handler with detailed validation
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');

    // Validate email with comprehensive checks
    const isValid = await validateEmail(email);
    
    if (isValid) {
      // Proceed to OTP generation if email is valid
      try {
        setIsLoading(true);
        
        // Simulate OTP generation
        const response = await fetch('/api/generate-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });

        const result = await response.json();

        if (result.success) {
          setCurrentStep(2);
        } else {
          setError('Failed to generate OTP. Please try again.');
        }
      } catch (err) {
        setError('Network error. Could not generate OTP.');
      } finally {
        setIsLoading(false);
      }
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
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter a complete OTP');
      return;
    }

    try {
      setIsLoading(true);
      
      // TODO: Replace with actual OTP verification endpoint
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          otp: otpCode 
        })
      });

      const result = await response.json();

      if (result.verified) {
        setCurrentStep(3);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Network error. OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password update with backend integration
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    // Client-side password validations
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      
      // TODO: Replace with actual password update endpoint
      const response = await fetch('/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          newPassword 
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Password updated successfully!');
        // Reset form or redirect
        setCurrentStep(1);
        setEmail('');
        setOtp(['', '', '', '', '', '']);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Failed to update password. Please try again.');
      }
    } catch (err) {
      setError('Network error. Password update failed.');
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
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            {error && <p className="error-message">{error}</p>}
            <button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Send OTP'}
            </button>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <h2>Enter OTP</h2>
            <p className="otp-info">
              A 6-digit OTP has been sent to {email}
            </p>
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
            <button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
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
            <button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;