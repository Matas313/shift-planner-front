import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, token, children }) => {
  const savedRole = localStorage.getItem("role");
  const savedToken = localStorage.getItem("token");

  if (!savedToken || savedRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
