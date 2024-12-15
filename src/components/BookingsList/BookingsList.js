import React from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/Bookings.css';

const BookingsList = ({ bookings, showActions = true }) => {
  const { 
    updateBookingStatus, 
    staffList, 
    aircraftList, 
    membersList 
  } = useAppContext();

  const getMemberName = (memberId) => {
    const member = membersList.find(m => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : 'Unknown Member';
  };

  const getStaffName = (staffId) => {
    const staff = staffList.find(s => s.id === staffId);
    return staff ? `${staff.firstName} ${staff.lastName}` : 'Unknown Staff';
  };

  const getAircraftInfo = (aircraftId) => {
    const aircraft = aircraftList.find(a => a.id === aircraftId);
    return aircraft ? `${aircraft.type} (${aircraft.registration})` : 'Unknown Aircraft';
  };

  return (
    <div className="bookings-list">
      {bookings.map(booking => (
        <div key={booking.id} className={`booking-item ${booking.status.toLowerCase()}`}>
          <div className="booking-header">
            <span className="booking-date">
              {new Date(booking.dateTime).toLocaleString()}
            </span>
            <span className={`booking-status ${booking.status.toLowerCase()}`}>
              {booking.status}
            </span>
          </div>
          <div className="booking-details">
            <p><strong>Member:</strong> {getMemberName(booking.memberId)}</p>
            <p><strong>Instructor:</strong> {getStaffName(booking.staffId)}</p>
            <p><strong>Aircraft:</strong> {getAircraftInfo(booking.aircraftId)}</p>
            <p><strong>Duration:</strong> {
              Math.round(
                (new Date(booking.endDateTime) - new Date(booking.dateTime)) / 1000 / 60
              )
            } minutes</p>
            {booking.comments && <p><strong>Comments:</strong> {booking.comments}</p>}
            
            {showActions && (
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
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;