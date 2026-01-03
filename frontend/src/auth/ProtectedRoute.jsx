import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" />;
  if (user.role !== role) return <Navigate to="/" />;

  return children;
}
