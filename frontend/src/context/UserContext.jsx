import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users from backend
  const fetchAllUsers = async () => {
    try {
      // You'll need to create this endpoint in your Spring Boot backend
      const response = await api.get('/auth/users');
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Set current user when app loads
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    fetchAllUsers();
    setLoading(false);
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
     fetchAllUsers();
};

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setAllUsers([]);
  };

  const value = {
    currentUser,
    allUsers,
    login,
    logout,
    refreshUsers: fetchAllUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};