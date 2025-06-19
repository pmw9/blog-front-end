// src/pages/Admin.tsx
import React, { useEffect, useState } from 'react';
import './styles/Admin.css';

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

const Admin: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || data);
        } else {
          setError('Failed to fetch posts');
        }
      } catch (err) {
        setError('Error fetching posts');
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      alert('Error deleting post');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      {error && <p className="error">{error}</p>}
      <ul className="admin-post-list">
        {posts.map(post => (
          <li key={post.id} className="admin-post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;