import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { markReservationAsServed } from '../services/api';

const Reservations: React.FC = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && (user.role === 'MANAGER' || user.role === 'ADMIN')) {
      setLoading(true);
      let url = '/api/reservations';
      if (filterDate) url += `?date=${filterDate}`;
      fetch(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => res.json())
        .then(setReservations)
        .catch(() => setError('Failed to fetch reservations'))
        .finally(() => setLoading(false));
    } else {
      fetch('/api/reservations')
        .then(res => res.json())
        .then(setReservations);
    }
  }, [user, filterDate]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this reservation?')) return;
    await fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setReservations(reservations.filter(r => r.id !== id));
  };

  const handleMarkAsServed = async (id: string) => {
    try {
      await markReservationAsServed(id);
      alert('Marked as served!');
      setReservations(reservations => reservations.map(r => r.id === id ? { ...r, served: true } : r));
    } catch (err) {
      alert('Failed to mark as served.');
    }
  };

  if (!user || (user.role !== 'MANAGER' && user.role !== 'ADMIN')) {
    return <div className="reservation-container">Access denied.</div>;
  }

  return (
    <div className="reservation-container">
      <h1>All Reservations</h1>
      <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
      {loading && <div>Loading...</div>}
      {error && <div className="reservation-error">{error}</div>}
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Name</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.date}</td>
              <td>{r.time}</td>
              <td>{r.paid ? 'Paid' : 'Unpaid'}</td>
              <td>{r.served ? 'Served ✅' : 'Not Served ❌'}</td>
              <td>
                {!r.served && (
                  <button
                    className="btn btn-outline"
                    onClick={() => handleMarkAsServed(r.id)}
                  >
                    Mark as Served
                  </button>
                )}
                <button onClick={() => handleDelete(r.id)}>Delete</button>
                {/* Add update button/modal here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
