// src/pages/CreatePost.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/CreatePost.css';

const CreatePost: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, authorId: user.id })
      });
      if (response.ok) {
        navigate('/');
      } else {
        setError('Failed to create post.');
      }
    } catch (err) {
      setError('Error creating post.');
    }
  };

  if (!user || (user.role !== 'ADMIN' && user.role !== 'MANAGER')) {
    return <div className="createpost-container">Access denied. You must be an ADMIN or MANAGER.</div>;
  }

  return (
    <div className="createpost-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
