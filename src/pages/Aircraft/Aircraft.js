import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Aircraft.css';
import BookingsList from '../../components/BookingsList/BookingsList';

const Aircraft = () => {
  const { aircraftList, setAircraftList } = useAppContext();
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [tempAircraft, setTempAircraft] = useState(null);

  const handleAircraftSelect = (aircraft) => {
    setSelectedAircraft(aircraft);
    setTempAircraft({...aircraft});
  };

  const handleInputChange = (changes) => {
    setTempAircraft({...tempAircraft, ...changes});
  };

  const handleSaveChanges = () => {
    setAircraftList(aircraftList.map(aircraft => 
      aircraft.id === tempAircraft.id ? tempAircraft : aircraft
    ));
    setSelectedAircraft(tempAircraft);
  };

  const handleAddAircraft = () => {
    const newAircraft = {
      id: `aircraft${Date.now()}`,
      registration: '',
      type: '',
      maintenanceStatus: 'Serviceable',
      totalHours: 0,
    };
    setSelectedAircraft(newAircraft);
    setTempAircraft(newAircraft);
  };

  const handleDeleteAircraft = (aircraftId) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      setAircraftList(aircraftList.filter(aircraft => aircraft.id !== aircraftId));
      setSelectedAircraft(null);
      setTempAircraft(null);
    }
  };

  const getBookingsByAircraft = (aircraftId) => {
    // Implement this function to get bookings by aircraft
  };

  return (
    <div className="main-content">
      <div className="content-container">
        <div className="header">
          <h1>Aircraft Management</h1>
          <button className="new-booking-btn" onClick={handleAddAircraft}>
            + Add New Aircraft
          </button>
        </div>
        <div className="aircraft-grid">
          <div className="aircraft-list">
            {aircraftList.map(aircraft => (
              <div 
                key={aircraft.id} 
                className={`aircraft-item ${selectedAircraft?.id === aircraft.id ? 'selected' : ''}`}
                onClick={() => handleAircraftSelect(aircraft)}
              >
                <div className="aircraft-registration">{aircraft.registration}</div>
                <div className="aircraft-type">{aircraft.type}</div>
              </div>
            ))}
          </div>
          
          {tempAircraft && (
            <div className="aircraft-details">
              <div className="details-header">
                <h2>Aircraft Details</h2>
                <div className="button-group">
                  <button 
                    className="save-btn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteAircraft(tempAircraft.id)}
                  >
                    Delete Aircraft
                  </button>
                </div>
              </div>
              <form className="details-form">
                <div className="form-group">
                  <label>Registration:</label>
                  <input
                    type="text"
                    value={tempAircraft.registration}
                    onChange={(e) => handleInputChange({
                      registration: e.target.value.toUpperCase()
                    })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Type:</label>
                  <input
                    type="text"
                    value={tempAircraft.type}
                    onChange={(e) => handleInputChange({
                      type: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Maintenance Status:</label>
                  <select
                    value={tempAircraft.maintenanceStatus}
                    onChange={(e) => handleInputChange({
                      maintenanceStatus: e.target.value
                    })}
                  >
                    <option value="Serviceable">Serviceable</option>
                    <option value="Unserviceable">Unserviceable</option>
                    <option value="Maintenance">In Maintenance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Total Hours:</label>
                  <input
                    type="number"
                    value={tempAircraft.totalHours}
                    onChange={(e) => handleInputChange({
                      totalHours: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
              </form>
              <h3>Flight Bookings</h3>
              <BookingsList 
                bookings={getBookingsByAircraft(tempAircraft.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Aircraft;