import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ReviewModeration: React.FC = () => {
  const { user } = useAuth();
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.role !== 'ADMIN') return;
    setLoading(true);
    fetch('/api/reviews/pending')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return res.json();
      })
      .then(setPendingReviews)
      .catch(() => setError('Could not load pending reviews.'))
      .finally(() => setLoading(false));
  }, [user]);

  const approveReview = async (id: string) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/reviews/${id}/approve`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to approve review');
      setPendingReviews(reviews => reviews.filter((r: any) => r.id !== id));
      setSuccess('Review approved.');
    } catch {
      setError('Could not approve review.');
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: string) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');
      setPendingReviews(reviews => reviews.filter((r: any) => r.id !== id));
      setSuccess('Review deleted.');
    } catch {
      setError('Could not delete review.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return <div className="reservation-error">Access denied. Admins only.</div>;
  }

  return (
    <div className="reservation-container">
      <h1 className="reservation-title">Review Moderation</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="reservation-error">{error}</div>}
      {success && <div className="reservation-success">{success}</div>}
      <ul className="review-list">
        {pendingReviews.length === 0 && !loading && <li>No pending reviews.</li>}
        {pendingReviews.map((review: any) => (
          <li key={review.id} className="review-item">
            <div><b>User:</b> {review.username}</div>
            <div><b>Content:</b> {review.content}</div>
            <button onClick={() => approveReview(review.id)} disabled={loading}>Approve</button>
            <button onClick={() => deleteReview(review.id)} disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewModeration;
