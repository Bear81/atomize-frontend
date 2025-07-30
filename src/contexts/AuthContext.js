// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axiosDefaults';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/dj-rest-auth/user/');
        setCurrentUser(data);
      } catch (err) {
        // If session expired or invalid cookie, clear user
        setCurrentUser(null);
        if (err.response?.status !== 403) {
          console.error('Auth check error:', err);
        }
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
