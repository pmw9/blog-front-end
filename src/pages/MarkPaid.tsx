import React, { useState } from 'react';

const MarkPaid: React.FC = () => {
  const [reservationId, setReservationId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMarkPaid = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`http://localhost:3001/api/reservations/${reservationId}/mark-paid`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to mark as paid');
      setMessage('Reservation marked as paid!');
    } catch (err: any) {
      setMessage(err.message || 'Error marking as paid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mark-paid-container">
      <h2>Mark Reservation as Paid</h2>
      <form onSubmit={handleMarkPaid}>
        <input
          type="text"
          placeholder="Enter Reservation ID"
          value={reservationId}
          onChange={e => setReservationId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Mark as Paid</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MarkPaid;
