import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaTrash, FaEdit, FaShieldAlt } from 'react-icons/fa';
import './manageTeam.css';

const ManageTeam = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Developer",
      permissions: ["view", "edit"],
      status: "Active"
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Developer',
    permissions: ['view']
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    setTeamMembers([
      ...teamMembers,
      {
        id: Date.now(),
        ...newMember,
        status: "Active"
      }
    ]);
    setNewMember({
      name: '',
      email: '',
      role: 'Developer',
      permissions: ['view']
    });
  };

  return (
    <div className="team-container">
      <motion.h1 
        className="team-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Manage Team
      </motion.h1>

      {/* Add Team Member Form */}
      <motion.div 
        className="add-member-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2><FaUserPlus /> Add New Team Member</h2>
        <form onSubmit={handleAddMember}>
          <div className="team-form-group">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              required
            />
          </div>
          <div className="team-form-group">
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              required
            />
          </div>
          <button type="submit">Add Member</button>
        </form>
      </motion.div>

      {/* Team Members List */}
      <div className="team-grid">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            className="team-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="member-header">
              <h3>{member.name}</h3>
              <div className={`status-badge ${member.status.toLowerCase()}`}>
                {member.status}
              </div>
            </div>
            <div className="member-info">
              <p>{member.email}</p>
              <p className="role"><FaShieldAlt /> {member.role}</p>
            </div>
            <div className="member-actions">
              <button className="edit-btn"><FaEdit /></button>
              <button className="delete-btn"><FaTrash /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageTeam;