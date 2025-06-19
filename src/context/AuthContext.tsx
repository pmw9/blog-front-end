import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'CASHIER' | 'USER';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  authChecked: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage or /auth/me on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      // Set local user immediately
      setUser(JSON.parse(storedUser));

      // Optional: verify token is still valid with backend
      fetch('http://localhost:3001/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
          setAuthChecked(true);
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setAuthChecked(true);
        });
    } else {
      setAuthChecked(true);
    }
  }, []);

  // Helper to get and clear intended path
  const getAndClearIntendedPath = () => {
    const path = localStorage.getItem('intendedPath');
    if (path) localStorage.removeItem('intendedPath');
    return path || '/';
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        let errorMsg = 'Invalid username or password';
        try {
          const errData = await response.json();
          if (errData && errData.error) errorMsg = errData.error;
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await response.json();
      setUser(data.user); // data.user must include role
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) localStorage.setItem('token', data.token);
      const redirectPath = getAndClearIntendedPath();
      navigate(redirectPath);
    } catch (error: any) {
      throw error;
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        let errorMsg = 'Signup failed';
        try {
          const errData = await response.json();
          if (errData && errData.error) errorMsg = errData.error;
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await response.json();
      setUser(data.user); // data.user must include role
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.token) localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext };
