import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './styles/Signup.css';

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(username, password);
      alert("Signup successful! You can now log in.");
    } catch (err: any) {
      if (err && err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err && err.message && err.message.includes("exists")) {
        setError("User already exists. Please choose a different username.");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here.</Link>
      </p>
    </div>
  );
};

export default Signup;