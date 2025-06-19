import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TodaysOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && (user.role === 'CASHIER' || user.role === 'MANAGER')) {
      setLoading(true);
      // Dummy/mock data for now
      setTimeout(() => {
        setOrders([
          { id: 1, time: '13:15', table: 2, amount: 45 },
          { id: 2, time: '14:00', table: 1, amount: 60 },
          { id: 3, time: '19:30', table: 3, amount: 80 },
        ]);
        setLoading(false);
      }, 500);
    }
  }, [user]);

  if (!user || (user.role !== 'CASHIER' && user.role !== 'MANAGER')) {
    return <div className="reservation-container">Access denied.</div>;
  }

  return (
    <div className="reservation-container">
      <h1 style={{ color: '#d40000', marginTop: '2rem', marginBottom: '1.5rem' }}>Today's Orders</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="reservation-error">{error}</div>}
      <table className="reservation-table">
        <thead>
          <tr>
            <th>Time</th><th>Table</th><th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.time}</td><td>{o.table}</td><td>${o.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysOrders;
