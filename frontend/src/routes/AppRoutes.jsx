import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import ProtectedRoute from "../auth/ProtectedRoute";
import FacultyDashboard from "../dashboards/FacultyDashboard";
import StudentDashboard from "../dashboards/StudentDashboard";
import HodDashboard from "../dashboards/HodDashboard";
import PrincipalDashboard from "../dashboards/PrincipalDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/faculty" element={
        <ProtectedRoute role="FACULTY">
          <FacultyDashboard />
        </ProtectedRoute>
      } />

      <Route path="/student" element={
        <ProtectedRoute role="STUDENT">
          <StudentDashboard />
        </ProtectedRoute>
      } />

      <Route path="/hod" element={
        <ProtectedRoute role="HOD">
          <HodDashboard />
        </ProtectedRoute>
      } />

      <Route path="/principal" element={
        <ProtectedRoute role="PRINCIPAL">
          <PrincipalDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
