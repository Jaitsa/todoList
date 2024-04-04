import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token") || '');

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken !== token) {
      setToken(storedToken || '');
    }
    console.log('updated');
  }, [token, setToken]); 

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
