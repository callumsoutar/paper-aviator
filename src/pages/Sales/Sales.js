import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Sales.css';

const Sales = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="page-container">
          <h1>Sales Dashboard</h1>
          <p>Sales analytics coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;