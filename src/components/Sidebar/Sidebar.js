import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../your-logo.png';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: '📅', label: 'Scheduler', path: '/' },
    { icon: '👥', label: 'Staff', path: '/staff' },
    { icon: '💰', label: 'Sales', path: '/sales' },
    { icon: '🧑‍✈️', label: 'Members', path: '/members' },
    { icon: '📊', label: 'Reports', path: '/reports' },
    { icon: '✈️', label: 'Aircraft', path: '/aircraft' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Aeroclub Logo" className="logo" />
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;