import React, { useState } from 'react';

// Demo data: 10 tables, some served, some not
const demoTables = [
  { id: 1, name: 'Table 1', guest: 'John Doe', date: '2025-06-19', time: '13:00', served: true },
  { id: 2, name: 'Table 2', guest: 'Jane Smith', date: '2025-06-19', time: '13:00', served: false },
  { id: 3, name: 'Table 3', guest: 'Carlos Ruiz', date: '2025-06-19', time: '19:00', served: true },
  { id: 4, name: 'Table 4', guest: 'Emily Zhang', date: '2025-06-19', time: '19:00', served: false },
  { id: 5, name: 'Table 5', guest: 'Fatima Al-Farsi', date: '2025-06-19', time: '13:00', served: false },
  { id: 6, name: 'Table 6', guest: 'Luca Bianchi', date: '2025-06-19', time: '19:00', served: true },
  { id: 7, name: 'Table 7', guest: 'Anna Müller', date: '2025-06-19', time: '13:00', served: false },
  { id: 8, name: 'Table 8', guest: 'Sophie Dubois', date: '2025-06-19', time: '19:00', served: true },
  { id: 9, name: 'Table 9', guest: 'David Kim', date: '2025-06-19', time: '13:00', served: false },
  { id: 10, name: 'Table 10', guest: 'Mia Rossi', date: '2025-06-19', time: '19:00', served: true },
];

const ServeTable: React.FC = () => {
  const [tables, setTables] = useState(demoTables);

  const handleServe = (id: number) => {
    setTables(tables => tables.map(t => t.id === id ? { ...t, served: true } : t));
  };

  return (
    <div className="serve-table-container" style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h1 style={{ color: '#d40000', marginBottom: '1.5rem' }}>Serve Table</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Table</th>
            <th>Guest</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map(t => (
            <tr key={t.id} style={{ background: t.served ? '#eaffea' : '#fff' }}>
              <td>{t.name}</td>
              <td>{t.guest}</td>
              <td>{t.date}</td>
              <td>{t.time}</td>
              <td>{t.served ? 'Served ✅' : 'Not Served ❌'}</td>
              <td>
                {!t.served && (
                  <button onClick={() => handleServe(t.id)} style={{ background: '#d40000', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>
                    Mark as Served
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServeTable;
