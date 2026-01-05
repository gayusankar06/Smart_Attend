import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const userStr = localStorage.getItem("user");

  if (!userStr) return <Navigate to="/" replace />;

  const user = JSON.parse(userStr);

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
