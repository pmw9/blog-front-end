// src/services/api.ts

export const getAllPosts = async () => {
  const res = await fetch('http://localhost:3001/api/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
};

export const createComment = async (postId: number, content: string, userName?: string) => {
  const res = await fetch(`http://localhost:3001/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, userName }),
  });

  if (!res.ok) throw new Error('Failed to add comment');
  return await res.json();
};

// Fetch booked timeslots for a date
export const getBookedTimeslots = async (date: string) => {
  const res = await fetch(`/api/reservations/slots?date=${date}`);
  return res.json();
};

// Book a reservation
export const bookReservation = async (
  date: string,
  time: string,
  userId: number,
  name: string
) => {
  const res = await fetch('http://localhost:3001/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, time, userId, name }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Slot already taken');
  }

  return res.json();
};

// Fetch all reservations for a user (with token)
export const getUserReservations = async (userId: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`http://localhost:3001/api/reservations/user/${userId}`, {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch reservations');
  return await res.json(); // expects array of reservations
};

export const markReservationAsServed = async (id: string): Promise<void> => {
  const res = await fetch(`http://localhost:3001/api/reservations/${id}/serve`, {
    method: 'PATCH',
  });
  if (!res.ok) {
    throw new Error('Failed to mark reservation as served');
  }
};