import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ role, children }) {
return localStorage.getItem("role") === role ? children : <Navigate to="/login" />;
}