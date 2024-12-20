import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosConfig from "../services/axios/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const myInfo = async () => {
    try {
      const res = await axiosConfig.get("/users/my-info");
      const userData = res.data;
      const user = {
        fullName: userData?.result?.fullName,
        email: userData?.result?.email,

        role: userData?.result?.role,
        avatar: userData?.result?.avatar,
      };
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid token", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      myInfo();
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    myInfo();
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
