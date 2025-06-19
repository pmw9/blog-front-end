// src/App.tsx
import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Review from './pages/Review';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostDetail from './pages/PostDetail';
import AdminPanel from './pages/styles/AdminPanel1';
import UserList from './pages/UserList';
import Reservation from './pages/Reservation';
import CheckReservation from './pages/CheckReservation';
import Reports from './pages/Reports';
import MarkPaid from './pages/MarkPaid';
import TodaysOrders from './pages/TodaysOrders';
import ServeTable from './pages/ServeTable';

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/book-reservation" element={<Reservation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/admin" element={
              <RequireRole allowed={['ADMIN']}>
                <AdminPanel />
              </RequireRole>
            } />
            <Route path="/users" element={user?.role === 'ADMIN' ? <UserList /> : <Navigate to="/" />} />
            <Route path="/check-reservation" element={<PrivateRoute><CheckReservation /></PrivateRoute>} />
            <Route path="/reservations" element={<RequireRole allowed={['MANAGER','ADMIN']}><Reservation /></RequireRole>} />
            <Route path="/reports" element={<RequireRole allowed={['MANAGER','ADMIN']}><Reports /></RequireRole>} />
            <Route path="/mark-paid" element={<RequireRole allowed={['CASHIER']}><MarkPaid /></RequireRole>} />
            <Route path="/orders" element={<RequireRole allowed={['CASHIER','MANAGER']}><TodaysOrders /></RequireRole>} />
            <Route path="/today-orders" element={<TodaysOrders />} />
            <Route path="/mark-paid" element={<MarkPaid />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/serve-table" element={<RequireRole allowed={['CASHIER']}><ServeTable /></RequireRole>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" state={{ from: '/check-reservation', message: 'Please log in to view your reservation.' }} replace />;
  }
  return <>{children}</>;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// RequireRole wrapper for role-based route protection
const RequireRole = ({ allowed, children }: { allowed: string[]; children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user || !allowed.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default App;