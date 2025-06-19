import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './styles/Review.css';

interface ReviewType {
  name: string;
  content: string;
  stars: string;
  status: 'pending' | 'approved';
}

const initialReviews: ReviewType[] = [
  { name: 'Liam H.', content: "The ribeye? Perfection. Medium-rare with just the right char. Will dream about it till I’m back.", stars: '★★★★★', status: 'approved' },
  { name: 'Sofía M.', content: "Cozy spot, great service. My sirloin was a touch well-done, but flavors were still banging.", stars: '★★★★☆', status: 'approved' },
  { name: 'Ethan W.', content: "If you haven’t tried the filet here, you haven’t lived. Took my girlfriend — she’s obsessed.", stars: '★★★★★', status: 'approved' },
  { name: 'Carla T.', content: "Came for steak, stayed for the vanilla milkshake. Pleasantly surprised. Burger was decent too.", stars: '★★★★☆', status: 'approved' },
  { name: 'Noah R.', content: "Waited a while since it was full, but the bacon BBQ burger made it worth every second.", stars: '★★★★☆', status: 'approved' },
  { name: 'Emma K.', content: "Simple interior, but the food stole the show. Everything felt fresh and made with care.", stars: '★★★★★', status: 'approved' },
  { name: 'José D.', content: "Los sabores eran intensos y bien logrados. El bistec tenía el punto perfecto. ¡Volveré pronto!", stars: '★★★★★', status: 'approved' },
  { name: 'Amara J.', content: "Fries came out cold. They replaced them quick, so props for that, but it broke the vibe a bit.", stars: '★★★☆☆', status: 'approved' },
  { name: 'Marc P.', content: "Honestly didn’t expect much… and then boom — best steak sandwich I’ve had in Europe.", stars: '★★★★★', status: 'approved' },
  { name: 'Hannah B.', content: "They were out of grilled asparagus 😔 Still giving it a high score for the atmosphere and juicy cuts.", stars: '★★★★☆', status: 'approved' }
];

const Review: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewType[]>(initialReviews);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [stars, setStars] = useState('★★★★★');
  const [error, setError] = useState('');
  const [pendingMessage, setPendingMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError('Please enter your name and review.');
      return;
    }
    setReviews([
      ...reviews,
      { name, content, stars, status: 'pending' }
    ]);
    setName('');
    setContent('');
    setStars('★★★★★');
    setError('');
    setPendingMessage('Your review is pending approval and will appear once approved by an admin.');
  };

  return (
    <div className="review-list">
      <h1 style={{
        textAlign: 'center',
        color: '#d40000',
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '2rem',
        letterSpacing: '1px',
        textShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        Customer Reviews
      </h1>
      {reviews.filter(r => r.status === 'approved').map((review, idx) => (
        <div key={idx} className="review-item">
          <h4>{review.name}</h4>
          <p>{review.content}</p>
          <p>Rating: {review.stars}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{marginTop: '2rem', background: '#fff', borderRadius: 8, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
        <h3>Leave a Review</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{marginBottom: 10, width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
        />
        <select value={stars} onChange={e => setStars(e.target.value)} style={{marginBottom: 10, width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}>
          <option value="★★★★★">★★★★★</option>
          <option value="★★★★☆">★★★★☆</option>
          <option value="★★★☆☆">★★★☆☆</option>
          <option value="★★☆☆☆">★★☆☆☆</option>
          <option value="★☆☆☆☆">★☆☆☆☆</option>
        </select>
        <textarea
          placeholder="Your Review"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={3}
          style={{marginBottom: 10, width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
        />
        {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}
        <button type="submit" style={{background: '#d40000', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer'}}>Publish Review</button>
        {pendingMessage && <div style={{color: '#b38f00', marginTop: 12, fontWeight: 500}}>{pendingMessage}</div>}
      </form>
      {user?.role === 'ADMIN' && (
        <div style={{marginTop: '2rem'}}>
          <h3>Pending Reviews (Admin Only)</h3>
          {reviews.filter(r => r.status === 'pending').length === 0 && <p>No pending reviews.</p>}
          {reviews.map((review, idx) => review.status === 'pending' && (
            <div key={idx} className="review-item" style={{background: '#fffbe6', border: '1px solid #ffe58f'}}>
              <h4>{review.name}</h4>
              <p>{review.content}</p>
              <p>Rating: {review.stars}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;