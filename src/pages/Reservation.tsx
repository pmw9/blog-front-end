import React, { useState, useEffect } from 'react';
import './styles/Reservation.css';
import { getBookedTimeslots, bookReservation } from '../services/api';
import { useAuth } from '../context/AuthContext';

const timeslots = [
  '13:00',
  '19:00',
];

const Reservation: React.FC = () => {
  const [date, setDate] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (date) {
      setLoading(true);
      getBookedTimeslots(date)
        .then(slots => setBookedSlots(slots))
        .catch(() => setBookedSlots([]))
        .finally(() => setLoading(false));
    } else {
      setBookedSlots([]);
    }
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setTimeslot('');
    setError('');
    setSuccess('');
  };

  const handleTimeslotSelect = (slot: string) => {
    setTimeslot(slot);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!date || !timeslot) {
      setError('Please select a date and timeslot.');
      return;
    }
    if (!currentUser || currentUser.role !== 'USER') {
      setError('You must be logged in as a regular user to book a reservation.');
      return;
    }
    setLoading(true);
    try {
      // Use correct API signature: bookReservation(date, timeslot, currentUser.id)
      await bookReservation(date, timeslot, currentUser.id, currentUser.username);
      setShowConfirm(true);
      setSuccess('Reservation confirmed!');
    } catch (err: any) {
      setError(err.message || 'This slot is already taken.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setDate('');
    setTimeslot('');
    setSuccess('');
    setError('');
  };

  // Only allow USER role to book reservations
  if (currentUser && currentUser.role !== 'USER') {
    return (
      <div className="reservation-container">
        <h1 className="reservation-title">Book a Reservation</h1>
        <div className="reservation-error">Only regular users can book tables. Your role: {currentUser.role}</div>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <h1 className="reservation-title">Book a Reservation</h1>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <label htmlFor="reservation-date">Select a date:</label>
        <input
          id="reservation-date"
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={handleDateChange}
          required
        />
        {date && (
          <div className="timeslot-section">
            <label>Select a timeslot:</label>
            <div className="timeslot-list">
              {timeslots.map(slot => (
                <button
                  type="button"
                  key={slot}
                  className={`timeslot-btn${timeslot === slot ? ' selected' : ''}`}
                  onClick={() => handleTimeslotSelect(slot)}
                  disabled={bookedSlots.includes(slot) || loading}
                >
                  {slot} {bookedSlots.includes(slot) ? '(Booked)' : ''}
                </button>
              ))}
            </div>
          </div>
        )}
        {error && <div className="reservation-error">{error}</div>}
        {success && <div className="reservation-success">{success}</div>}
        <button type="submit" className="reserve-btn" disabled={!date || !timeslot || loading}>
          {loading ? 'Processing...' : 'Reserve'}
        </button>
      </form>
      {showConfirm && (
        <div className="reservation-confirm-overlay">
          <div className="reservation-confirm-popup">
            <h2>Reservation Confirmed!</h2>
            <p>Your reservation for <b>{date}</b> at <b>{timeslot}</b> is booked.</p>
            <button onClick={handleCloseConfirm} className="close-confirm-btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
