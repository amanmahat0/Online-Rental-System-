import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PaymentHistory.css";
import { FaSearch, FaFileDownload, FaSpinner } from "react-icons/fa";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(null);
  const recordsPerPage = 5;

  const ownerId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!ownerId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`/api/owners/${ownerId}/transactions`);
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transaction data:", err);
        setError("Failed to load transaction history. Please try again later.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [ownerId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const toggleDetails = (id) => {
    if (detailsOpen === id) {
      setDetailsOpen(null);
    } else {
      setDetailsOpen(id);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.payerId.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || transaction.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredTransactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const downloadReceipt = (transactionId) => {
    console.log(`Downloading receipt for transaction ${transactionId}`);
    alert(`Receipt for transaction ${transactionId} is being downloaded`);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "payment-history-status-badge completed";
      case "pending":
        return "payment-history-status-badge pending";
      case "failed":
        return "payment-history-status-badge failed";
      case "refunded":
        return "payment-history-status-badge refunded";
      default:
        return "payment-history-status-badge";
    }
  };

  if (loading) {
    return (
      <div className="payment-history-loading">
        <FaSpinner className="payment-history-spinner" />
        <p>Loading transaction history...</p>
      </div>
    );
  }

  if (error) {
    return <div className="payment-history-error">{error}</div>;
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
            placeholder="Search by booking ID or guest name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="payment-history-search-input"
          />
        </div>

        <div className="payment-history-filter-container">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="payment-history-status-filter"
          >
            <option value="all">All Transactions</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="payment-history-no-transactions">
          <p>No transactions found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="payment-history-transactions-table-container">
            <table className="payment-history-transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Booking ID</th>
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
                      className="payment-history-transaction-row"
                    >
                      <td>{formatDate(transaction.date)}</td>
                      <td>{transaction.bookingId}</td>
                      <td>{transaction.payerId.name}</td>
                      <td>{formatCurrency(transaction.amount)}</td>
                      <td>
                        <span
                          className={getStatusBadgeClass(transaction.status)}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="payment-history-download-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadReceipt(transaction._id);
                          }}
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
                                  {transaction._id}
                                </p>
                                <p>
                                  <strong>Payment Method:</strong>{" "}
                                  {transaction.paymentMethod}
                                </p>
                                <p>
                                  <strong>Base Amount:</strong>{" "}
                                  {formatCurrency(transaction.baseAmount)}
                                </p>
                                <p>
                                  <strong>Service Fee:</strong>{" "}
                                  {formatCurrency(transaction.serviceFee)}
                                </p>
                                <p>
                                  <strong>Total:</strong>{" "}
                                  {formatCurrency(transaction.amount)}
                                </p>
                              </div>

                              <div className="payment-history-details-section">
                                <h4>Guest Information</h4>
                                <p>
                                  <strong>Name:</strong>{" "}
                                  {transaction.payerId.name}
                                </p>
                                <p>
                                  <strong>Email:</strong>{" "}
                                  {transaction.payerId.email}
                                </p>
                                <p>
                                  <strong>Phone:</strong>{" "}
                                  {transaction.payerId.phone || "Not provided"}
                                </p>
                              </div>

                              <div className="payment-history-details-section">
                                <h4>Booking Information</h4>
                                <p>
                                  <strong>Check-in:</strong>{" "}
                                  {formatDate(transaction.bookingDetails.checkIn)}
                                </p>
                                <p>
                                  <strong>Check-out:</strong>{" "}
                                  {formatDate(
                                    transaction.bookingDetails.checkOut
                                  )}
                                </p>
                                <p>
                                  <strong>Property:</strong>{" "}
                                  {transaction.bookingDetails.propertyName}
                                </p>
                                <p>
                                  <strong>Guests:</strong>{" "}
                                  {transaction.bookingDetails.guestCount}
                                </p>
                              </div>
                            </div>
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
            {pageNumbers.map((number) => (
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
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="payment-history-pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;