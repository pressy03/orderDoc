import { useState, createContext } from "react";
import { NavLink, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";

export type Role = "patient" | "doctor";
export const RoleCtx = createContext<Role>("patient");

export default function App() {
  const [role, setRole] = useState<Role>("patient");
  const navigate = useNavigate();

  const active = "font-bold text-blue-600 uppercase";
  const inactive = "text-gray-600 lowercase";

  const switchTo = (newRole: Role) => {
    setRole(newRole);
    navigate("/appointments");
  };

  return (
    <RoleCtx.Provider value={role}>
      <div className="min-h-screen">
        <nav className="bg-white shadow">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
            <div className="flex gap-4">
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "text-gray-500"
                }
              >
                Appointments
              </NavLink>
              {role === "patient" ? (
                <NavLink
                  to="/patients"
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "text-gray-500"
                  }
                >
                  Patients
                </NavLink>
              ) : (
                <NavLink
                  to="/doctors"
                  className={({ isActive }) =>
                    isActive ? "font-semibold" : "text-gray-500"
                  }
                >
                  Doctors
                </NavLink>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => switchTo("patient")}
                className={role === "patient" ? active : inactive}
              >
                PATIENT
              </button>
              <span>/</span>
              <button
                onClick={() => switchTo("doctor")}
                className={role === "doctor" ? active : inactive}
              >
                doctor
              </button>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/appointments" />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>
      </div>
    </RoleCtx.Provider>
  );
}
