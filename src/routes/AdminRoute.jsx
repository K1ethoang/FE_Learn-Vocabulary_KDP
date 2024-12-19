// routes/AdminRoute.js
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  console.log("AdminRoute");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userSession = localStorage.getItem("userSession");
  const jsonObject = JSON.parse(userSession);
  console.log("check:", jsonObject);

  return isAuthenticated && userSession && jsonObject.role ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
