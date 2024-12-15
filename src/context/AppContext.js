import React, { createContext, useState, useEffect, useContext } from 'react';
import * as db from '../services/mockDatabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([]);
  const [aircraftList, setAircraftList] = useState([]);
  const [membersList, setMembersList] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Initialize database on first load
    db.initializeDatabase();
    
    // Load initial data
    setStaffList(db.getStaff());
    setAircraftList(db.getAircraft());
    setMembersList(db.getMembers());
    setBookings(db.getBookings());
  }, []);

  // Update handlers
  const updateStaff = (newStaffList) => {
    db.setStaff(newStaffList);
    setStaffList(newStaffList);
  };

  const updateAircraft = (newAircraftList) => {
    db.setAircraft(newAircraftList);
    setAircraftList(newAircraftList);
  };

  const updateMembers = (newMembersList) => {
    db.setMembers(newMembersList);
    setMembersList(newMembersList);
  };

  const updateBookings = (newBookings) => {
    db.setBookings(newBookings);
    setBookings(newBookings);
  };

  return (
    <AppContext.Provider value={{
      staffList,
      setStaffList: updateStaff,
      aircraftList,
      setAircraftList: updateAircraft,
      membersList,
      setMembersList: updateMembers,
      bookings,
      setBookings: updateBookings,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);