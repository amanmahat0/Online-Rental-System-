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


};

export default ForgotPassword;