import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProfileData {
  fullname: string;
  email: string;
  dob: string;
  profileImage?: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>({ fullname: '', email: '', dob: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/users/${user.id}/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setProfile({
          fullname: data.fullname || '',
          email: data.email || '',
          dob: data.dob ? data.dob.slice(0, 10) : '',
          profileImage: data.profileImage || ''
        });
        setPreview(data.profileImage || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load profile');
        setLoading(false);
      });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      let imageUrl = profile.profileImage;
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const imgRes = await fetch(`/api/users/${user?.id}/upload-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });
        if (!imgRes.ok) throw new Error('Image upload failed');
        const imgData = await imgRes.json();
        imageUrl = imgData.url;
      }
      const res = await fetch(`/api/users/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          fullname: profile.fullname,
          email: profile.email,
          dob: profile.dob,
          profileImage: imageUrl
        })
      });
      if (!res.ok) throw new Error('Update failed');
      setSuccess('Profile updated successfully!');
      setImageFile(null);
    } catch {
      setError('Failed to update profile');
    }
  };

  if (!user) return <div>Please log in to view your profile.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 8, padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h1 style={{ color: '#d40000', textAlign: 'center', marginBottom: 24 }}>My Profile</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <img
            src={preview || profile.profileImage || '/assests/home/default-avatar.png'}
            alt="Profile Preview"
            style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', marginBottom: 8, border: '2px solid #eee' }}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: 8 }} />
        </div>
        <label style={{ display: 'block', marginBottom: 8 }}>Full Name</label>
        <input
          type="text"
          name="fullname"
          value={profile.fullname}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <label style={{ display: 'block', marginBottom: 8 }}>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 16, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <label style={{ display: 'block', marginBottom: 8 }}>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 24, borderRadius: 4, border: '1px solid #ccc' }}
        />
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
        <button type="submit" style={{ background: '#d40000', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 1.5rem', fontWeight: 600, cursor: 'pointer', width: '100%' }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
