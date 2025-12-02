import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user, isLoggedIn]);

  const login = (email, password) => {
    // Simulate login - in real app, this would be an API call
    const userData = {
      email,
      name: email.split('@')[0],
      id: Date.now().toString(),
    };
    setUser(userData);
    setIsLoggedIn(true);
    return { success: true };
  };

  const register = (name, email, password) => {
    // Simulate registration - in real app, this would be an API call
    const userData = {
      name,
      email,
      id: Date.now().toString(),
    };
    setUser(userData);
    setIsLoggedIn(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const socialLogin = (provider) => {
    // Simulate social login
    const userData = {
      email: `${provider}@example.com`,
      name: provider.charAt(0).toUpperCase() + provider.slice(1) + ' User',
      id: Date.now().toString(),
      provider,
    };
    setUser(userData);
    setIsLoggedIn(true);
    return { success: true };
  };

  const value = {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    socialLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

