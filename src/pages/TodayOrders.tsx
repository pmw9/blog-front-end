import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/TodayOrders.css';

interface Order {
  id: number;
  user: { username: string };
  time: string;
  date: string;
  items: string[];
  paid: boolean;
  tables: string;
  amount: number;
}

const TodayOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetch(`http://localhost:3001/api/reservations/today?date=${today}`)
      .then(res => res.json())
      .then(setOrders)
      .catch(() => setError('Failed to load orders'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="orders-container">
      <h2>Today's Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Tables</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.time + o.date}>
              <td>{o.date}</td>
              <td>{o.time}</td>
              <td>{o.tables}</td>
              <td>€{o.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayOrders;
