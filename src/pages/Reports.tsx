import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    if (user && (user.role === 'MANAGER' || user.role === 'ADMIN')) {
      // Dummy data for now
      setWeekTotal(24);
      setMonthTotal(102);
      setRevenue(102 * 50); // e.g., $50 per reservation
    }
  }, [user]);

  if (!user || (user.role !== 'MANAGER' && user.role !== 'ADMIN')) {
    return <div className="reservation-container">Access denied.</div>;
  }

  return (
    <div className="reservation-container">
      <h1>Reports</h1>
      <div>Total Reservations This Week: <b>{weekTotal}</b></div>
      <div>Total Reservations This Month: <b>{monthTotal}</b></div>
      <div>Estimated Revenue: <b>${revenue}</b></div>
      {/* Optionally add charts here */}
    </div>
  );
};

export default Reports;
