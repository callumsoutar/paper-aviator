import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Staff.css';
import BookingsList from '../../components/BookingsList/BookingsList';

const Staff = () => {
  const { staffList, setStaffList } = useAppContext();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [tempStaff, setTempStaff] = useState(null);

  const ratingOptions = ['CPL', 'PPL', 'MEA', 'IR', 'FIR'];
  const instructorCategories = ['Grade 1', 'Grade 2', 'Grade 3'];

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setTempStaff({...staff});
  };

  const handleInputChange = (changes) => {
    setTempStaff({...tempStaff, ...changes});
  };

  const handleSaveChanges = () => {
    setStaffList(staffList.map(staff => 
      staff.id === tempStaff.id ? tempStaff : staff
    ));
    setSelectedStaff(tempStaff);
  };

  
  const handleAddStaff = () => {
    const newStaff = {
      id: `staff${Date.now()}`,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      ratings: [],
      instructorCategory: '',
      active: true
    };
    setSelectedStaff(newStaff);
    setTempStaff(newStaff);
  };

  const handleDeleteStaff = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffList(staffList.filter(staff => staff.id !== staffId));
      setSelectedStaff(null);
      setTempStaff(null);
    }
  };

  const getBookingsByStaff = (staffId) => {
    return staffList.find(staff => staff.id === staffId)?.bookings || [];
  };

  return (
    <div className="main-content">
      <div className="content-container">
        <div className="header">
          <h1>Staff Management</h1>
          <button className="new-booking-btn" onClick={handleAddStaff}>+ Add New Staff</button>
        </div>
        <div className="staff-grid">
          <div className="staff-list">
            {staffList.map(staff => (
              <div 
                key={staff.id} 
                className={`staff-item ${selectedStaff?.id === staff.id ? 'selected' : ''}`}
                onClick={() => handleStaffSelect(staff)}
              >
                <div className="staff-name">{staff.firstName} {staff.lastName}</div>
                <div className="staff-category">{staff.instructorCategory}</div>
              </div>
            ))}
          </div>
          
          {tempStaff && (
            <div className="staff-details">
              <div className="details-header">
                <h2>Staff Details</h2>
                <div className="button-group">
                  <button 
                    className="save-btn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteStaff(tempStaff.id)}
                  >
                    Delete Staff
                  </button>
                </div>
              </div>
              <form className="details-form">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={tempStaff.firstName}
                    onChange={(e) => handleInputChange({
                      firstName: e.target.value
                    })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={tempStaff.lastName}
                    onChange={(e) => handleInputChange({
                      lastName: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={tempStaff.email}
                    onChange={(e) => handleInputChange({
                      email: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={tempStaff.phone}
                    onChange={(e) => handleInputChange({
                      phone: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Ratings:</label>
                  <select
                    multiple
                    value={tempStaff.ratings}
                    onChange={(e) => handleInputChange({
                      ratings: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                  >
                    {ratingOptions.map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Instructor Category:</label>
                  <select
                    value={tempStaff.instructorCategory}
                    onChange={(e) => handleInputChange({
                      instructorCategory: e.target.value
                    })}
                  >
                    <option value="">Select Category</option>
                    {instructorCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </form>
              <h3>Assigned Bookings</h3>
              <BookingsList 
                bookings={getBookingsByStaff(tempStaff.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;