import { Navigate } from "react-router-dom";
import { useAuth } from "./../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const userSession = localStorage.getItem('userSession')
  console.log('run 2', isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
