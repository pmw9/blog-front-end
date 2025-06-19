// src/pages/AdminPanel.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const TABS = [
  { key: 'users', label: 'User Management', description: 'View and manage all users, assign roles, and control access.' },
  { key: 'reviews', label: 'Review Moderation', description: 'Approve or delete pending customer reviews.' },
  { key: 'dashboard', label: 'Dashboard Overview', description: 'View key metrics and summary data for the restaurant.' },
];

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers)
      .catch(() => setError('Failed to load users'));
  }, []);

  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey);
    if (tabKey === 'users') navigate('/users');
    if (tabKey === 'reviews') navigate('/review-moderation');
    if (tabKey === 'dashboard') navigate('/dashboard');
  };

  return (
    <div className="admin-panel-container">
      <h1 className="admin-panel-title">Admin Panel</h1>
      {error && <div className="reservation-error">{error}</div>}
      <div className="admin-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`admin-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="admin-tab-content">
        <h2>{TABS.find(t => t.key === activeTab)?.label}</h2>
        <p>{TABS.find(t => t.key === activeTab)?.description}</p>
        {activeTab === 'users' && (
          <ul>
            {users.map(u => (
              <li key={u.id}>{u.username} ({u.role})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

// AdminPanel1.tsx is deprecated and replaced by AdminPanel.tsx
// Remove the old AdminPanel1 file to avoid confusion