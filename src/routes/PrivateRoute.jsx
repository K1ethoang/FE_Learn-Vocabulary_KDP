import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const userSession = localStorage.getItem('userSession')

  return (isAuthenticated && userSession )? children : <Navigate to="/login" />;
};

export default PrivateRoute;
