import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Puslapiai
import LoginPage from "./components/Pages/LoginPage";
import ForgotPasswordPage from "./components/Pages/ForgotPasswordPage";
import AdminDashboard from "./components/Pages/AdminDashboard";
import DashboardHome from "./components/Pages/AdminDashboard/AdminPanel/DashboardHome";
import Admins from "./components/Pages/AdminDashboard/AdminPanel/Admin";
import Employees from "./components/Pages/AdminDashboard/AdminPanel/Employees";
import Shifts from "./components/Pages/AdminDashboard/AdminPanel/Shifts";
import EmployeeDashboard from "./components/Pages/EmployeeDashboard";
import EmployeeProfile from "./components/Pages/EmployeeProfile";
import AdminProfile from "./components/Pages/AdminDashboard/AdminProfile";
import ShiftCalendarWrapper from "./components/Pages/AdminDashboard/AdminPanel/ShiftCalendarWrapper";

// Komponentai
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Router>
      <Header role={role} setRole={setRole} />
      <Routes>
        <Route
          path="/"
          element={
            role === "ADMIN" ? (
              <Navigate to="/admin" />
            ) : role === "EMPLOYEE" ? (
              <Navigate to="/employee" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<LoginPage setRole={setRole} setToken={setToken} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="ADMIN" token={token}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="admins" element={<Admins />} />
          <Route path="employees" element={<Employees />} />
          <Route path="shifts" element={<Shifts />} />
          <Route path="profile" element={<AdminProfile />} /> {/* Čia pridėtas admin profilis */}
          <Route path="calendar" element={<ShiftCalendarWrapper />} />
        </Route>

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="EMPLOYEE" token={token}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="EMPLOYEE" token={token}>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
