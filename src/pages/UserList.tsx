// src/pages/UserList.tsx
import React, { useEffect, useState } from 'react';
import './styles/UserList.css';

interface User {
  id: number;
  username: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const roles = ['USER', 'ADMIN', 'MANAGER', 'CASHIER'];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || data); // Support either direct array or { users: [...] }
        } else {
          setError('Failed to load users');
        }
      } catch (err) {
        setError('Error loading users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleRoleChange = async (id: number, newRole: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map((user) => (user.id === id ? { ...user, role: newRole } : user)));
      } else {
        setError('Failed to update user role');
      }
    } catch (err) {
      setError('Failed to update user role');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-container">
      <h1>Admin Panel - Users</h1>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((u) => (
            <div key={u.id} className="user-card">
              <p><strong>Username:</strong> {u.username}</p>
              <p><strong>Role:</strong> {u.role}</p>
              <select
                value={u.role}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                style={{ marginBottom: '0.5rem', padding: '0.3rem 0.7rem', borderRadius: 4 }}
                disabled={
                  u.role === 'ADMIN' &&
                  u.username === localStorage.getItem('user') &&
                  JSON.parse(localStorage.getItem('user') || '{}').id === u.id
                }
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <button onClick={() => handleDelete(u.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;