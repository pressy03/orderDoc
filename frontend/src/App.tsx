import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
const linkClass = "px-3 py-2 rounded hover:bg-gray-100";
const active = "font-semibold text-blue-600";
export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow">
        <div className="max-w-4xl mx-auto flex gap-4 px-4">
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? active : "text-gray-600"}`}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? active : "text-gray-600"}`}
          >
            Patients
          </NavLink>
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? active : "text-gray-600"}`}
          >
            Appointments
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/doctors" />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
      </Routes>
    </div>
  );
}
