import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import './Members.css';
import BookingsList from '../../components/BookingsList/BookingsList';

const Members = () => {
  const { 
    membersList, 
    setMembersList, 
    getBookingsByMember 
  } = useAppContext();
  const [selectedMember, setSelectedMember] = useState(null);
  const [tempMember, setTempMember] = useState(null);

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setTempMember({...member});
  };

  const handleInputChange = (changes) => {
    setTempMember({...tempMember, ...changes});
  };

  const handleSaveChanges = () => {
    setMembersList(membersList.map(member => 
      member.id === tempMember.id ? tempMember : member
    ));
    setSelectedMember(tempMember);
  };

  const handleAddMember = () => {
    const newMember = {
      id: `member${Date.now()}`,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      membershipType: '',
      membershipStatus: 'Active',
      medicalExpiry: '',
      licenseNumber: ''
    };
    setSelectedMember(newMember);
    setTempMember(newMember);
  };

  const handleDeleteMember = (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembersList(membersList.filter(member => member.id !== memberId));
      setSelectedMember(null);
      setTempMember(null);
    }
  };

  const MemberBookings = ({ memberId }) => {
    const { updateBookingStatus } = useAppContext();
    const bookings = getBookingsByMember(memberId);

    return (
      <div className="member-bookings">
        <h3>Bookings History</h3>
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className={`booking-item ${booking.status.toLowerCase()}`}>
              <div className="booking-header">
                <span className="booking-date">
                  {new Date(booking.dateTime).toLocaleDateString()}
                </span>
                <span className={`booking-status ${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-details">
                <p>{booking.comments}</p>
                <div className="booking-actions">
                  {booking.status === 'Unconfirmed' && (
                    <>
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                        className="confirm-btn"
                      >
                        Confirm
                      </button>
                      <button 
                        onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button 
                      onClick={() => updateBookingStatus(booking.id, 'Complete')}
                      className="complete-btn"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="main-content">
      <div className="content-container">
        <div className="header">
          <h1>Member Management</h1>
          <button className="new-booking-btn" onClick={handleAddMember}>
            + Add New Member
          </button>
        </div>
        <div className="member-grid">
          <div className="member-list">
            {membersList.map(member => (
              <div 
                key={member.id} 
                className={`member-item ${selectedMember?.id === member.id ? 'selected' : ''}`}
                onClick={() => handleMemberSelect(member)}
              >
                <div className="member-name">{member.firstName} {member.lastName}</div>
                <div className="member-type">{member.membershipType}</div>
              </div>
            ))}
          </div>
          
          {tempMember && (
            <div className="member-details">
              <div className="details-header">
                <h2>Member Details</h2>
                <div className="button-group">
                  <button 
                    className="save-btn"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteMember(tempMember.id)}
                  >
                    Delete Member
                  </button>
                </div>
              </div>
              <form className="details-form">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={tempMember.firstName}
                    onChange={(e) => handleInputChange({
                      firstName: e.target.value
                    })}
                  />
                </div>
                
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={tempMember.lastName}
                    onChange={(e) => handleInputChange({
                      lastName: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={tempMember.email}
                    onChange={(e) => handleInputChange({
                      email: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={tempMember.phone}
                    onChange={(e) => handleInputChange({
                      phone: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Membership Type:</label>
                  <select
                    value={tempMember.membershipType}
                    onChange={(e) => handleInputChange({
                      membershipType: e.target.value
                    })}
                  >
                    <option value="">Select Type</option>
                    <option value="Full">Full</option>
                    <option value="Student">Student</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>License Number:</label>
                  <input
                    type="text"
                    value={tempMember.licenseNumber}
                    onChange={(e) => handleInputChange({
                      licenseNumber: e.target.value
                    })}
                  />
                </div>

                <div className="form-group">
                  <label>Medical Expiry:</label>
                  <input
                    type="date"
                    value={tempMember.medicalExpiry}
                    onChange={(e) => handleInputChange({
                      medicalExpiry: e.target.value
                    })}
                  />
                </div>
              </form>
              <MemberBookings memberId={tempMember.id} />
              <h3>Booking History</h3>
              <BookingsList 
                bookings={getBookingsByMember(tempMember.id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;