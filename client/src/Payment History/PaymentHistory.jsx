import React, { useState, useEffect, useRef } from "react";
import "./PaymentHistory.css";
import { FaSearch, FaFileDownload, FaSpinner } from "react-icons/fa";
import html2canvas from "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.esm.js";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const receiptRef = useRef(null);
  const recordsPerPage = 5;

  // Get user from localStorage or context
  const ownerId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchTransactions = async () => {
    if (!ownerId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      queryParams.append("from", ownerId);
      queryParams.append("to", ownerId);

      const response = await fetch(
        `http://localhost:5000/api/payment/search?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();

      if (data.status) {
        // Modify all transaction statuses to "Paid"
        const modifiedTransactions = data.data.map((transaction) => ({
          ...transaction,
          status: "Paid",
        }));
        setTransactions(modifiedTransactions);
      } else {
        // Instead of showing an error, just set transactions to an empty array
        setTransactions([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transaction data:", err);
      // Changed from error to empty transactions for no data
      setTransactions([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleDetails = (id) => {
    setDetailsOpen(detailsOpen === id ? null : id);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // New function to handle receipt view
  const handleViewReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  // Function to close receipt modal
  const closeReceipt = () => {
    setShowReceipt(false);
    setSelectedTransaction(null);
  };

  // Download receipt as image
  const downloadReceipt = async () => {
    const receiptElement = receiptRef.current;
    if (!receiptElement) return;

    try {
      const canvas = await html2canvas(receiptElement);
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Payment_Receipt_${selectedTransaction?._id.substring(
        0,
        8
      )}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating receipt:", error);
      alert("Failed to download receipt. Please try again.");
    }
  };

  // Print receipt
  const printReceipt = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Receipt</title><style>");
    // Add the necessary CSS for proper printing
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; }
      .receipt-container { max-width: 800px; margin: 0 auto; padding: 20px; }
      .receipt-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 20px; }
      .receipt-title { text-align: right; }
      .receipt-status { background-color: #4CAF50; color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; }
      .receipt-info { display: flex; flex-wrap: wrap; gap: 20px; }
      .info-item { margin-bottom: 10px; }
      .info-label { font-weight: bold; margin-right: 5px; }
      .receipt-section { margin-bottom: 20px; padding: 15px; border-radius: 5px; background-color: #fafafa; }
      .receipt-section h4 { margin-top: 0; color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; }
      .payment-details { background-color: #f5f5f5; }
      .payment-item { display: flex; justify-content: space-between; margin-bottom: 10px; }
      .payment-subtotal { display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px dashed #ddd; font-weight: bold; }
      .payment-total { display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd; font-weight: bold; font-size: 1.2rem; }
      .receipt-footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; display: flex; justify-content: space-between; font-size: 0.8rem; color: #777; }
      .thank-you-message { text-align: center; font-size: 1.2rem; color: #4CAF50; margin-bottom: 10px; }
      .note { font-size: 0.8rem; color: #777; text-align: center; }
    `);
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(receiptRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Filter transactions based on search term only
  const filteredTransactions = transactions.filter((transaction) => {
    // Text search filter
    return (
      transaction.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.propertyId.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (transaction.transactionId &&
        transaction.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

  // Generate pagination numbers with ellipsis for large page counts
  const generatePaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);

      // Calculate start and end pages to show
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the beginning
      if (currentPage <= 2) {
        endPage = 3;
      }

      // Adjust if at the end
      if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add pages in the middle
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always include last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const renderStatusBadge = () => {
    // Always return "Paid" status badge
    return <span className="payment-history-status-badge Paid">Paid</span>;
  };

  // Receipt Modal Component
  const ReceiptModal = () => {
    if (!selectedTransaction) return null;

    const bookingFee = selectedTransaction.amount * 0.1; // 10% booking fee
    const totalAmount = selectedTransaction.amount + bookingFee;

    // Always set status to "Paid"
    const transactionStatus = "Paid";

    return (
      <div className="receipt-modal-overlay">
        <div className="receipt-modal">
          <div className="receipt-modal-content">
            <div className="receipt-container" ref={receiptRef}>
              <div className="receipt-header">
                <div className="receipt-logo">
                  <i className="fas fa-home"></i>
                  <h2>Online Rental System</h2>
                </div>
                <div className="receipt-title">
                  <h3>Payment Receipt</h3>
                  <span className="receipt-status">
                    ✓ {transactionStatus.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="receipt-body">
                <div className="receipt-section">
                  <div className="receipt-info">
                    <div className="info-item">
                      <span className="info-label">Transaction ID:</span>
                      <span className="info-value">
                        {selectedTransaction.transactionId ||
                          selectedTransaction._id.substring(0, 8)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Date & Time:</span>
                      <span className="info-value">
                        {formatDateTime(selectedTransaction.paymentDate)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Payment Method:</span>
                      <span className="info-value payment-method">
                        {selectedTransaction.paymentMethod || "Online Payment"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="receipt-section">
                  <h4>Customer Details</h4>
                  <div className="customer-details">
                    <div className="info-item">
                      <span className="info-label">Name:</span>
                      <span className="info-value">
                        {selectedTransaction.from?.name || "N/A"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email:</span>
                      <span className="info-value">
                        {selectedTransaction.from?.email || "N/A"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">
                        {selectedTransaction.from?.contact || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="receipt-section">
                  <h4>Property Information</h4>
                  <div className="property-details">
                    <div className="info-item">
                      <span className="info-label">Property:</span>
                      <span className="info-value">
                        {selectedTransaction.propertyId?.title || "N/A"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Location:</span>
                      <span className="info-value">
                        {selectedTransaction.propertyId?.location?.city ||
                          "Not specified"}
                      </span>
                    </div>
                    {selectedTransaction.referenceId && (
                      <div className="info-item">
                        <span className="info-label">Booking ID:</span>
                        <span className="info-value">
                          {selectedTransaction.referenceId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="receipt-section payment-details">
                  <h4>Payment Details</h4>
                  <div className="payment-item">
                    <span className="payment-description">Monthly Rent</span>
                    <span className="payment-amount">
                      NPR {selectedTransaction.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="payment-subtotal">
                    <span>Subtotal</span>
                    <span>
                      NPR {selectedTransaction.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="payment-item">
                    <span className="payment-description">
                      Service Fee (10%)
                    </span>
                    <span className="payment-amount">
                      NPR {bookingFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="payment-total">
                    <span>Total</span>
                    <span>NPR {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="receipt-section">
                  <div className="receipt-note">
                    <div className="thank-you-message">
                      <i className="fas fa-heart"></i>
                      <p>Thank you for your payment!</p>
                    </div>
                    <p className="note">
                      This is an electronically generated receipt and does not
                      require a signature.
                    </p>
                  </div>
                </div>
              </div>

              <div className="receipt-footer">
                <div className="footer-info">
                  <p>Rent IT</p>
                  <p>Contact: support@rentit.com | +977-01-XXXXXXX</p>
                </div>
                <div className="qr-code">
                  <i className="fas fa-qrcode"></i>
                </div>
              </div>
            </div>

            <div className="receipt-actions">
              <button className="print-btn" onClick={printReceipt}>
                <i className="fas fa-print"></i> Print Receipt
              </button>
              <button className="download-btn" onClick={downloadReceipt}>
                <i className="fas fa-download"></i> Download Receipt
              </button>
              <button className="close-btn" onClick={closeReceipt}>
                <i className="fas fa-times"></i> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="payment-history-loading">
        <FaSpinner className="payment-history-spinner" />
        <p>Loading transaction history...</p>
      </div>
    );
  }

  // Modified error handling - if there's an authentication error, show that
  // Otherwise, just display the no transactions message in the main UI
  if (error && error === "User not authenticated") {
    return (
      <div className="payment-history-error">
        <p>{error}</p>
        <button
          className="payment-history-retry-btn"
          onClick={fetchTransactions}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      <div className="payment-history-header">
        <h1>Transaction History</h1>
        <p>View and manage your property booking payments</p>
      </div>

      <div className="payment-history-filters">
        <div className="payment-history-search-container">
          <FaSearch className="payment-history-search-icon" />
          <input
            type="text"
            placeholder="Search by property, guest or transaction ID"
            value={searchTerm}
            onChange={handleSearchChange}
            className="payment-history-search-input"
          />
        </div>
      </div>

      <div className="payment-history-summary">
        <div className="payment-history-summary-item">
          <span className="payment-history-summary-label">
            Total Transactions:
          </span>
          <span className="payment-history-summary-value">
            {filteredTransactions.length}
          </span>
        </div>

        {filteredTransactions.length > 0 && (
          <div className="payment-history-summary-item">
            <span className="payment-history-summary-label">Total Amount:</span>
            <span className="payment-history-summary-value">
              {formatCurrency(
                filteredTransactions.reduce(
                  (sum, transaction) => sum + transaction.amount,
                  0
                )
              )}
            </span>
          </div>
        )}
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="payment-history-no-transactions">
          {/* Changed message to indicate no transaction history instead of no matching filters */}
          <p>
            {searchTerm
              ? "No transactions found matching your criteria."
              : "No transaction history available yet."}
          </p>
          {searchTerm && (
            <button
              className="payment-history-clear-filters-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="payment-history-transactions-table-container">
            <table className="payment-history-transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Property Name</th>
                  <th>Guest</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((transaction) => (
                  <React.Fragment key={transaction._id}>
                    <tr
                      onClick={() => toggleDetails(transaction._id)}
                      className={`payment-history-transaction-row ${
                        detailsOpen === transaction._id ? "expanded" : ""
                      }`}
                    >
                      <td>{formatDate(transaction.paymentDate)}</td>
                      <td>{transaction.propertyId.title}</td>
                      <td>{transaction.from.name}</td>
                      <td>{formatCurrency(transaction.amount)}</td>
                      <td>{renderStatusBadge()}</td>
                      <td>
                        <button
                          className="payment-history-download-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewReceipt(transaction);
                          }}
                          title="View Receipt"
                        >
                          <FaFileDownload />
                        </button>
                      </td>
                    </tr>
                    {detailsOpen === transaction._id && (
                      <tr className="payment-history-details-row">
                        <td colSpan="6">
                          <div className="payment-history-transaction-details">
                            <div className="payment-history-details-grid">
                              <div className="payment-history-details-section">
                                <h4>Payment Details</h4>
                                <p>
                                  <strong>Transaction ID:</strong>{" "}
                                  {transaction.transactionId ||
                                    transaction._id.substring(0, 8)}
                                </p>
                                <p>
                                  <strong>Payment Method:</strong>{" "}
                                  {transaction.paymentMethod ||
                                    "Online Payment"}
                                </p>
                                <p>
                                  <strong>Monthly Amount:</strong>{" "}
                                  {formatCurrency(transaction.amount)}
                                </p>
                                <p>
                                  <strong>Service Fee:</strong>{" "}
                                  {formatCurrency(transaction.amount * 0.1)}
                                </p>
                                <p>
                                  <strong>Total:</strong>{" "}
                                  {formatCurrency(transaction.amount * 1.1)}
                                </p>
                                <p>
                                  <strong>Status:</strong> {renderStatusBadge()}
                                </p>
                              </div>

                              <div className="payment-history-details-section">
                                <h4>Guest Information</h4>
                                <p>
                                  <strong>Name:</strong> {transaction.from.name}
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {transaction.from.email}
                                </p>
                                <p>
                                  <strong>Phone:</strong>{" "}
                                  {transaction.from.contact || "Not provided"}
                                </p>
                              </div>

                              <div className="payment-history-details-section">
                                <h4>Booking Information</h4>
                                <p>
                                  <strong>Booked Date:</strong>{" "}
                                  {formatDate(transaction.paymentDate)}
                                </p>
                                <p>
                                  <strong>Property:</strong>{" "}
                                  {transaction.propertyId.title}
                                </p>
                                <p>
                                  <strong>Location:</strong>{" "}
                                  {transaction.propertyId.location?.city ||
                                    "Not specified"}
                                </p>
                                {transaction.referenceId && (
                                  <p>
                                    <strong>Booking ID:</strong>{" "}
                                    {transaction.referenceId}
                                  </p>
                                )}
                              </div>
                            </div>
                            <button
                              className="view-receipt-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewReceipt(transaction);
                              }}
                            >
                              View Full Receipt
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="payment-history-pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="payment-history-pagination-button"
            >
              Previous
            </button>

            {generatePaginationNumbers().map((number, index) =>
              number === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="payment-history-pagination-ellipsis"
                >
                  ...
                </span>
              ) : (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={
                    currentPage === number
                      ? "payment-history-pagination-button active"
                      : "payment-history-pagination-button"
                  }
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="payment-history-pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}

      {showReceipt && <ReceiptModal />}
    </div>
  );
};

export default PaymentHistory;