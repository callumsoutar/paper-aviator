import React, { useState } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { useAppContext } from '../../context/AppContext';
import BookingDetailsModal from '../../components/BookingDetailsModal/BookingDetailsModal';

import './Scheduler.css';

const Scheduler = () => {
  const {
    aircraftList,
    bookings,
    setBookings,
    membersList,
    staffList
  } = useAppContext();
  
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [draggedEventInfo, setDraggedEventInfo] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewBooking, setIsNewBooking] = useState(false);

  // Combine and format resources
  const groups = [
    { id: 'aircraft-header', title: 'Aircraft', resourceType: 'header' },
    ...aircraftList.map(aircraft => ({
      id: aircraft.id,
      title: `${aircraft.type} (${aircraft.registration})`,
      resourceType: 'aircraft'
    })),
    { id: 'staff-header', title: 'Staff', resourceType: 'header' },
    ...staffList.map(staff => ({
      id: staff.id,
      title: `${staff.firstName} ${staff.lastName}`,
      resourceType: 'staff'
    }))
  ];

  // Custom group renderer
  const groupRenderer = ({ group }) => {
    if (group.resourceType === 'header') {
      return (
        <div className="resource-group">
          {group.title}
        </div>
      );
    }
    return (
      <div className="resource-item">
        {group.title}
      </div>
    );
  };

  // Format items (events) for the timeline
  const items = bookings.map(booking => {
    const member = membersList.find(m => m.id === booking.memberId);
    const memberName = member ? `${member.firstName} ${member.lastName}` : 'Unknown Member';
    return {
      id: booking.id,
      group: booking.aircraftId,
      title: memberName,
      start_time: moment(booking.dateTime).valueOf(),
      end_time: moment(booking.endDateTime).valueOf(),
      canMove: true,
      canResize: true,
      canChangeGroup: true,
      itemProps: {
        className: 'timeline-item',
        style: {
          background: '#3174ad',
          color: 'white',
          borderRadius: '4px',
          padding: '2px 6px',
        }
      }
    };
  });

  return (
    <div className="content-wrapper">
      <div className="scheduler-container">
        <div className="scheduler-header">
          <button 
            className="new-booking-btn"
            onClick={() => {
              setIsNewBooking(true);
              setIsModalOpen(true);
            }}
          >
            <span>+</span> New Booking
          </button>
        </div>
        <div className="timeline-wrapper">
          <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().startOf('day')}
            defaultTimeEnd={moment().endOf('day')}
            canMove={true}
            canResize="both"
            canChangeGroup={true}
            onItemMove={(itemId, dragTime, newGroupOrder) => {
              setDraggedEventInfo({
                event: {
                  id: itemId,
                  startStr: moment(dragTime).format(),
                  endStr: moment(dragTime + 3600000).format()
                },
                newResource: groups[newGroupOrder]
              });
              setShowConfirmationDialog(true);
            }}
            onItemSelect={(itemId) => {
              const booking = bookings.find(b => b.id === itemId);
              setSelectedBooking(booking);
              setIsNewBooking(false);
              setIsModalOpen(true);
            }}
            sidebarWidth={200}
            lineHeight={50}
            groupRenderer={groupRenderer}
          />
        </div>
      </div>

      {showConfirmationDialog && draggedEventInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Changes</h3>
            <p>Are you sure you want to update this booking?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirmationDialog(false)}>Cancel</button>
              <button
                onClick={() => {
                  const updatedBookings = bookings.map(booking => {
                    if (booking.id === draggedEventInfo.event.id) {
                      return {
                        ...booking,
                        dateTime: draggedEventInfo.event.startStr,
                        endDateTime: draggedEventInfo.event.endStr,
                        ...(draggedEventInfo.newResource && {
                          aircraftId: draggedEventInfo.newResource.id
                        })
                      };
                    }
                    return booking;
                  });
                  setBookings(updatedBookings);
                  setShowConfirmationDialog(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <BookingDetailsModal
          booking={selectedBooking}
          isNew={isNewBooking}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedBooking) => {
            if (isNewBooking) {
              setBookings([...bookings, { ...updatedBooking, id: Date.now() }]);
            } else {
              setBookings(bookings.map(b => 
                b.id === updatedBooking.id ? updatedBooking : b
              ));
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Scheduler;
