import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookingDetailsModal.css';

const BookingDetailsModal = ({ booking, isNew, onClose, onSave }) => {
  const { 
    aircraftList,
    membersList,
    staffList,
  } = useAppContext();

  // Initialize with default values for new booking
  const defaultBooking = {
    aircraftId: aircraftList[0]?.id || '',
    staffId: '',
    dateTime: new Date(),
    endDateTime: new Date(Date.now() + 3600000), // 1 hour later
    comments: '',
    status: 'Unconfirmed',
    memberId: membersList[0]?.id || ''
  };

  const [editedBooking, setEditedBooking] = useState(booking ? {
    ...booking,
    dateTime: new Date(booking.dateTime),
    endDateTime: new Date(booking.endDateTime)
  } : defaultBooking);

  const handleSave = () => {
    onSave({
      ...editedBooking,
      dateTime: editedBooking.dateTime.toISOString(),
      endDateTime: editedBooking.endDateTime.toISOString()
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="booking-details-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isNew ? 'New Booking' : 'Booking Details'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content custom-scrollbar">
          {/* Date and Time Selection */}
          <div className="datetime-group">
            <div className="form-group">
              <label>Start Date & Time</label>
              <DatePicker
                selected={editedBooking.dateTime}
                onChange={(date) => setEditedBooking({...editedBooking, dateTime: date})}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                timeIntervals={15}
                minTime={new Date().setHours(6, 0, 0)}
                maxTime={new Date().setHours(20, 0, 0)}
                placeholderText="Select start date and time"
              />
            </div>

            <div className="form-group">
              <label>End Date & Time</label>
              <DatePicker
                selected={editedBooking.endDateTime}
                onChange={(date) => setEditedBooking({...editedBooking, endDateTime: date})}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                timeIntervals={15}
                minTime={new Date().setHours(6, 0, 0)}
                maxTime={new Date().setHours(20, 0, 0)}
                minDate={editedBooking.dateTime}
                placeholderText="Select end date and time"
              />
            </div>
          </div>

          {/* Member Selection */}
          <div className="form-group">
            <label>Member</label>
            <div className="select-wrapper">
              <select
                className="form-control custom-select"
                value={editedBooking.memberId}
                onChange={(e) => setEditedBooking({...editedBooking, memberId: e.target.value})}
              >
                <option value="">Select Member</option>
                {membersList.map(member => (
                  <option key={member.id} value={member.id}>
                    {`${member.firstName} ${member.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Instructor Selection */}
          <div className="form-group">
            <label>Instructor</label>
            <div className="select-wrapper">
              <select
                className="form-control custom-select"
                value={editedBooking.staffId}
                onChange={(e) => setEditedBooking({...editedBooking, staffId: e.target.value})}
              >
                <option value="">Select Instructor</option>
                {staffList.map(staff => (
                  <option key={staff.id} value={staff.id}>
                    {`${staff.firstName} ${staff.lastName}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Aircraft Selection */}
          <div className="form-group">
            <label>Aircraft</label>
            <div className="select-wrapper">
              <select
                className="form-control custom-select"
                value={editedBooking.aircraftId}
                onChange={(e) => setEditedBooking({...editedBooking, aircraftId: e.target.value})}
              >
                <option value="">Select Aircraft</option>
                {aircraftList.map(aircraft => (
                  <option key={aircraft.id} value={aircraft.id}>
                    {`${aircraft.type} (${aircraft.registration})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Selection */}
          <div className="form-group">
            <label>Status</label>
            <div className="select-wrapper">
              <select
                className="form-control custom-select"
                value={editedBooking.status}
                onChange={(e) => setEditedBooking({...editedBooking, status: e.target.value})}
              >
                <option value="Unconfirmed">Unconfirmed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Complete">Complete</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Comments */}
          <div className="form-group">
            <label>Comments</label>
            <textarea 
              className="form-control"
              value={editedBooking.comments}
              onChange={(e) => setEditedBooking({...editedBooking, comments: e.target.value})}
              placeholder="Add any notes or comments here..."
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;