import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import './analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  // User Growth Data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Users',
      data: [50, 75, 85, 110, 150, 180],
      borderColor: '#6c5ce7',
      backgroundColor: 'rgba(108, 92, 231, 0.2)',
      tension: 0.4
    }]
  };

  // Agent Distribution Data
  const agentData = {
    labels: ['Premium Agents', 'Standard Agents', 'New Agents'],
    datasets: [{
      data: [30, 45, 25],
      backgroundColor: [
        'rgba(46, 213, 115, 0.8)',
        'rgba(108, 92, 231, 0.8)',
        'rgba(255, 71, 87, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  // Property Listings Data
  const propertyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Properties Listed',
      data: [25, 35, 45, 40, 60, 55],
      backgroundColor: 'rgba(46, 213, 115, 0.6)',
    }]
  };

  return (
    <div className="analytics-container">
      <motion.div 
        className="analytics-header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Platform Analytics</h1>
        <div className="stats-summary">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>650</p>
          </div>
          <div className="stat-card">
            <h3>Active Agents</h3>
            <p>100</p>
          </div>
          <div className="stat-card">
            <h3>Properties Listed</h3>
            <p>260</p>
          </div>
        </div>
      </motion.div>

      <div className="analytics-grid">
        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>User Growth</h2>
          <Line 
            data={userGrowthData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: { color: '#fff' }
                }
              },
              scales: {
                y: { 
                  grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                  ticks: { color: '#fff' }
                },
                x: { 
                  grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                  ticks: { color: '#fff' }
                }
              }
            }}
          />
        </motion.div>

        <motion.div 
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Agent Distribution</h2>
          <Doughnut 
            data={agentData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'right',
                  labels: { color: '#fff' }
                }
              }
            }}
          />
        </motion.div>

        <motion.div 
          className="chart-card wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Property Listings Growth</h2>
          <Bar 
            data={propertyData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: { color: '#fff' }
                }
              },
              scales: {
                y: { 
                  grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                  ticks: { color: '#fff' }
                },
                x: { 
                  grid: { color: 'rgba(255, 255, 255, 0.1)' }, 
                  ticks: { color: '#fff' }
                }
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;