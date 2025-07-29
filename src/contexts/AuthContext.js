import { createContext, useState, useEffect } from 'react';
import axios from '../api/axiosDefaults';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/dj-rest-auth/user/');
        setCurrentUser(data);
      } catch (err) {
        setCurrentUser(null);
      }
      setLoaded(true);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {loaded ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};
