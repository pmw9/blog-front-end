// src/pages/PostDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, Comment } from '../types';
import './styles/PostDetail.css';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts/${id}`);
        const data = await res.json();
        setPost(data.post);
        setComments(data.comments || []);
      } catch {
        setError('Failed to load post.');
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent }),
      });
      const newComment = await res.json();
      setComments([...comments, newComment]);
      setCommentContent('');
    } catch {
      setError('Failed to post comment.');
    }
  };

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail-container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-box">
          <p>{comment.content}</p>
        </div>
      ))}

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;