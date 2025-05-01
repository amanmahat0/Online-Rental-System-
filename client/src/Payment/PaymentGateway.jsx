import React, { useState } from 'react';
import PaymentOptions from './PaymentOptions';
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';
import TermsModal from './modals/TermsModal';
import SuccessModal from './modals/SuccessModal';
import FailureModal from './modals/FailureModal';
import Receipt from './Receipt';
import './styles/PaymentGateway.css';

const PaymentGateway = ({ propertyDetails, onClose }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    amount: propertyDetails?.price || 0,
    purpose: `Rent payment for ${propertyDetails?.title || 'Property'}`,
    termsAccepted: false
  });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [transactionId, setTransactionId] = useState('');

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setStep(2);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    setStep(3);
  };

  const handleOpenTerms = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const handlePaymentSubmit = () => {
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        const txnId = 'TXN' + Date.now().toString().slice(-8);
        setTransactionId(txnId);
        setReceiptData({
          ...formData,
          paymentMethod,
          transactionId: txnId,
          date: new Date().toLocaleString(),
          status: 'Completed'
        });
        setShowSuccessModal(true);
      } else {
        setShowFailureModal(true);
      }
    }, 2000);
  };

  const handleTryAgain = () => {
    setShowFailureModal(false);
    setStep(1);
  };

  const handleViewReceipt = () => {
    setShowSuccessModal(false);
    setStep(4);
  };

  const renderStepIndicator = () => {
    const steps = ['Step 1: Choose Payment Method', 'Step 2: Fill Payment Details', 'Step 3: Review Payment', 'Step 4: Receipt'];
    return <div className="step-indicator">{steps[step - 1]}</div>;
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h2>Payment Gateway</h2>
        <p>Complete your payment securely</p>
      </div>

      {renderStepIndicator()}

      {step === 1 && (
        <div className="step-content animate-fade-in">
          <PaymentOptions 
            onSelect={handlePaymentMethodSelect} 
            propertyDetails={propertyDetails}
          />
        </div>
      )}

      {step === 2 && (
        <div className="step-content animate-fade-in">
          <button 
            className="go-back-btn" 
            onClick={() => setStep(1)} // Go back to step 1
          >
            Go Back
          </button>
          <PaymentForm 
            formData={formData}
            paymentMethod={paymentMethod}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onOpenTerms={handleOpenTerms}
          />
        </div>
      )}

      {step === 3 && (
        <div className="step-content animate-fade-in">
          <button 
            className="go-back-btn" 
            onClick={() => setStep(2)} // Go back to step 2
          >
            Go Back
          </button>
          <PaymentSummary 
            formData={formData}
            paymentMethod={paymentMethod}
            onConfirm={handlePaymentSubmit}
            onBack={() => setStep(2)} // Go back to step 2
          />
        </div>
      )}

      {step === 4 && receiptData && (
        <div className="step-content animate-fade-in">
          <button 
            className="go-back-btn" 
            onClick={() => setStep(1)} // Go back to step 1
          >
            Go Back
          </button>
          <Receipt receiptData={receiptData} onClose={onClose} />
        </div>
      )}

      {showTermsModal && (
        <TermsModal 
          onClose={() => setShowTermsModal(false)} 
        />
      )}

      {showSuccessModal && (
        <SuccessModal 
          transactionId={transactionId}
          onViewReceipt={handleViewReceipt} 
        />
      )}

      {showFailureModal && (
        <FailureModal 
          onTryAgain={handleTryAgain} 
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default PaymentGateway;