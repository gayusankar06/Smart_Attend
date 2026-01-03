import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import HodDashboard from "./pages/hod/HodDashboard";
import PrincipalDashboard from "./pages/principal/PrincipalDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/hod" element={<HodDashboard />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
