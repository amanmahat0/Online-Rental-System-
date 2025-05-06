// src/user/Payment/utils/paymentUtils.js
/**
 * Utility functions for payment processing
 */

/**
 * Generate a unique transaction ID
 * @returns {string} Unique transaction ID
 */
export const generateTransactionId = () => {
    const prefix = 'TXN';
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp.slice(-8)}${random}`;
  };
  
  /**
   * Format currency in Nepalese Rupees
   * @param {number} amount - Amount to format
   * @returns {string} Formatted amount with NPR symbol
   */
  export const formatCurrency = (amount) => {
    return `NPR ${parseFloat(amount).toLocaleString()}`;
  };
  
  /**
   * Validate Nepalese phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid, false otherwise
   */
  export const validateNepalPhone = (phone) => {
    const phoneRegex = /^[9][0-9]{9}$/;
    return phoneRegex.test(phone);
  };
  
  /**
   * Initialize eSewa payment
   * @param {Object} paymentData - Payment data for eSewa
   * @returns {Promise} Promise resolving to payment result
   */
  export const initializeEsewaPayment = (paymentData) => {
    return new Promise((resolve, reject) => {
      // In a real implementation, this would integrate with eSewa's API
      console.log('Initializing eSewa payment with:', paymentData);
      
      // Simulate API call
      setTimeout(() => {
        // Simulate success 80% of the time
        if (Math.random() < 0.8) {
          resolve({
            success: true,
            transactionId: generateTransactionId(),
            message: 'Payment successful'
          });
        } else {
          reject({
            success: false,
            error: 'Payment failed',
            code: 'PAYMENT_FAILED'
          });
        }
      }, 2000);
    });
  };
  
  /**
   * Initialize Khalti payment
   * @param {Object} paymentData - Payment data for Khalti
   * @returns {Promise} Promise resolving to payment result
   */
  export const initializeKhaltiPayment = (paymentData) => {
    return new Promise((resolve, reject) => {
      // In a real implementation, this would integrate with Khalti's API
      console.log('Initializing Khalti payment with:', paymentData);
      
      // Simulate API call
      setTimeout(() => {
        // Simulate success 80% of the time
        if (Math.random() < 0.8) {
          resolve({
            success: true,
            transactionId: generateTransactionId(),
            message: 'Payment successful'
          });
        } else {
          reject({
            success: false,
            error: 'Payment failed',
            code: 'PAYMENT_FAILED'
          });
        }
      }, 2000);
    });
  };
  
  /**
   * Validate bank transfer details
   * @param {Object} transferData - Bank transfer data
   * @param {File} receipt - Receipt file
   * @returns {boolean} True if valid, false otherwise
   */
  export const validateBankTransfer = (transferData, receipt) => {
    // Basic validation for bank transfer
    if (!receipt) {
      return false;
    }
    
    // Check file size (max 5MB)
    if (receipt.size > 5 * 1024 * 1024) {
      return false;
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(receipt.type)) {
      return false;
    }
    
    return true;
  };
  
  /**
   * Submit bank transfer for verification
   * @param {Object} transferData - Bank transfer data
   * @param {File} receipt - Receipt file
   * @returns {Promise} Promise resolving to verification result
   */
  export const submitBankTransfer = (transferData, receipt) => {
    return new Promise((resolve, reject) => {
      // Validate transfer data and receipt
      if (!validateBankTransfer(transferData, receipt)) {
        reject({
          success: false,
          error: 'Invalid transfer data or receipt',
          code: 'INVALID_DATA'
        });
        return;
      }
      
      // In a real implementation, this would upload the receipt and submit for verification
      console.log('Submitting bank transfer with:', transferData);
      
      // Simulate API call
      setTimeout(() => {
        // Simulate success 80% of the time
        if (Math.random() < 0.8) {
          resolve({
            success: true,
            transactionId: generateTransactionId(),
            verificationStatus: 'pending',
            message: 'Bank transfer submitted for verification'
          });
        } else {
          reject({
            success: false,
            error: 'Bank transfer verification failed',
            code: 'VERIFICATION_FAILED'
          });
        }
      }, 2000);
    });
  };
  
  // src/user/Payment/utils/receiptGenerator.js
  /**
   * Utility functions for generating and handling receipts
   */
  
  /**
   * Format date for receipt
   * @param {Date} date - Date to format
   * @returns {string} Formatted date string
   */
  export const formatReceiptDate = (date = new Date()) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  /**
   * Generate receipt data object
   * @param {Object} paymentData - Payment data
   * @param {string} transactionId - Transaction ID
   * @returns {Object} Receipt data object
   */
  export const generateReceiptData = (paymentData, transactionId) => {
    return {
      receiptNumber: `R-${transactionId}`,
      transactionId,
      date: formatReceiptDate(),
      customerName: paymentData.fullName,
      customerEmail: paymentData.email,
      customerPhone: paymentData.phone,
      customerAddress: paymentData.address,
      amount: paymentData.amount,
      purpose: paymentData.purpose,
      paymentMethod: paymentData.paymentMethod,
      status: 'Completed'
    };
  };
  
  /**
   * Send receipt via email
   * @param {Object} receiptData - Receipt data
   * @param {string} email - Email to send receipt to
   * @returns {Promise} Promise resolving to email result
   */
  export const sendReceiptEmail = (receiptData, email) => {
    return new Promise((resolve) => {
      // In a real implementation, this would send an email
      console.log(`Sending receipt to ${email}:`, receiptData);
      
      // Simulate API call
      setTimeout(() => {
        resolve({
          success: true,
          message: `Receipt sent to ${email}`
        });
      }, 1000);
    });
  };
  
  /**
   * Generate PDF receipt (placeholder)
   * @param {Object} receiptData - Receipt data
   * @returns {Blob} PDF blob
   */
  export const generatePdfReceipt = (receiptData) => {
    // In a real implementation, this would generate a PDF
    console.log('Generating PDF receipt:', receiptData);
    
    // This is a placeholder. In a real app, you would use a library like jsPDF
    // to generate a proper PDF document.
    return new Blob(['PDF Receipt Placeholder'], { type: 'application/pdf' });
  };