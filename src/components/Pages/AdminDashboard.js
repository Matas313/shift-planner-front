import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="flex justify-between items-center">
        <h1>Admin Panelė</h1>
      </div>

      <nav>
        <NavLink to="/admin" end className={({ isActive }) => isActive ? "active" : ""}>
          Pagrindinis
        </NavLink>
        <NavLink to="/admin/employees" className={({ isActive }) => isActive ? "active" : ""}>
          Darbuotojai
        </NavLink>
        <NavLink to="/admin/shifts" className={({ isActive }) => isActive ? "active" : ""}>
          Pamainos
        </NavLink>
        <NavLink to="/admin/admins" className={({ isActive }) => isActive ? "active" : ""}>
          Administratoriai
        </NavLink>
        <NavLink to="/admin/profile" className={({ isActive }) => isActive ? "active" : ""}>
          Profilis
        </NavLink>
<NavLink to="/admin/calendar" className={({ isActive }) => (isActive ? "active" : "")}>
  Kalendorius
</NavLink>
      </nav>

      <div className="outlet-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
