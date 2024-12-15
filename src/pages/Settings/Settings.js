import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Settings.css';

const Settings = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="page-container">
          <h1>Settings</h1>
          <p>Settings configuration coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;