// src/pages/CheckReservation.tsx
import React, { useState } from 'react';

const CheckReservation: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`http://localhost:3001/api/reservations/check?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Reservation not found');
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error checking reservation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="check-reservation-container">
      <h2>Check Your Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter reservation code or email"
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Check</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div className="reservation-result">
          <h3>Reservation Details</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Date:</strong> {result.date}</p>
          <p><strong>Time:</strong> {result.time}</p>
          <p><strong>Guests:</strong> {result.guests}</p>
          <p><strong>Status:</strong> {result.status}</p>
        </div>
      )}
    </div>
  );
};

export default CheckReservation;
