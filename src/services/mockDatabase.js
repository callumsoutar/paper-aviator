import initialStaff from '../data/initial-data/staff.json';
import initialAircraft from '../data/initial-data/aircraft.json';
import initialMembers from '../data/initial-data/members.json';
import initialBookings from '../data/initial-data/bookings.json';

const STORAGE_KEYS = {
  STAFF: 'aeroclub_staff',
  AIRCRAFT: 'aeroclub_aircraft',
  MEMBERS: 'aeroclub_members',
  BOOKINGS: 'aeroclub_bookings',
};

// Initialize data from localStorage or initial data
const initializeData = (key, initialData) => {
  const storedData = localStorage.getItem(key);
  if (!storedData) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(storedData);
};

// Generic CRUD operations
const getData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Staff operations
export const getStaff = () => getData(STORAGE_KEYS.STAFF);
export const setStaff = (staff) => setData(STORAGE_KEYS.STAFF, staff);
export const updateStaffMember = (id, updates) => {
  const staff = getStaff();
  const updatedStaff = staff.map(member => 
    member.id === id ? { ...member, ...updates } : member
  );
  setStaff(updatedStaff);
  return updatedStaff;
};

// Aircraft operations
export const getAircraft = () => getData(STORAGE_KEYS.AIRCRAFT);
export const setAircraft = (aircraft) => setData(STORAGE_KEYS.AIRCRAFT, aircraft);
export const updateAircraft = (id, updates) => {
  const aircraft = getAircraft();
  const updatedAircraft = aircraft.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
  setAircraft(updatedAircraft);
  return updatedAircraft;
};

// Members operations
export const getMembers = () => getData(STORAGE_KEYS.MEMBERS);
export const setMembers = (members) => setData(STORAGE_KEYS.MEMBERS, members);
export const updateMember = (id, updates) => {
  const members = getMembers();
  const updatedMembers = members.map(member => 
    member.id === id ? { ...member, ...updates } : member
  );
  setMembers(updatedMembers);
  return updatedMembers;
};

// Bookings operations
export const getBookings = () => getData(STORAGE_KEYS.BOOKINGS);
export const setBookings = (bookings) => setData(STORAGE_KEYS.BOOKINGS, bookings);
export const updateBooking = (id, updates) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(booking => 
    booking.id === id ? { ...booking, ...updates } : booking
  );
  setBookings(updatedBookings);
  return updatedBookings;
};

// Initialize all data
export const initializeDatabase = () => {
  initializeData(STORAGE_KEYS.STAFF, initialStaff);
  initializeData(STORAGE_KEYS.AIRCRAFT, initialAircraft);
  initializeData(STORAGE_KEYS.MEMBERS, initialMembers);
  initializeData(STORAGE_KEYS.BOOKINGS, initialBookings);
};