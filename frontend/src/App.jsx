import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import HodDashboard from "./pages/HodDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED */}
        <Route path="/student" element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        } />

        <Route path="/faculty" element={
          <ProtectedRoute role="FACULTY">
            <FacultyDashboard />
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
    </BrowserRouter>
  );
}
