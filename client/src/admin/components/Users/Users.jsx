import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa';
import './users.css';

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      joinDate: "2024-03-20",
      status: "Active",
      role: "User",
      lastLogin: "2024-03-19"
    },
    // Add more users as needed
  ]);

  const handleEditUser = (userId) => {
    console.log('Edit user:', userId);
  };

  const handleDeleteUser = (userId) => {
    console.log('Delete user:', userId);
  };

  const handleToggleStatus = (userId) => {
    console.log('Toggle status:', userId);
  };

  return (
    <div className="users-container">
      <motion.h1 
        className="users-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="user-info">
                  <FaUser className="user-icon" />
                  <span>{user.name}</span>
                </td>
                <td>
                  <FaEnvelope className="email-icon" />
                  {user.email}
                </td>
                <td>
                  <FaCalendar className="date-icon" />
                  {user.joinDate}
                </td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td className="actions">
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="action-btn toggle-status"
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.status === 'Active' ? <FaBan /> : <FaCheckCircle />}
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;