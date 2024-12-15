import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Reports.css';

const Reports = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="page-container">
          <h1>Reports</h1>
          <p>Reporting features coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;