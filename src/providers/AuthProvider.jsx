import React, { createContext, useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', true)
  };
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
    window.location.reload();
  };



  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
