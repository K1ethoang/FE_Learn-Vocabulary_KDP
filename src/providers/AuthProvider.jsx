import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userData = {
          username: decodedToken.sub,
          role: decodedToken.scope,
        };
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    const userData = {
      username: decodedToken.sub,
      role: decodedToken.scope,
    };
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    setIsAuthenticated(false);
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
