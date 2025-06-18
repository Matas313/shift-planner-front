import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "ADMIN" || role === "SUPERADMIN") {
        navigate("/admin");
      } else if (role === "EMPLOYEE") {
        navigate("/employee");
      }
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>Shift Planner</h1>
      <nav className="home-nav">
        <Link to="/employees">Darbuotojai</Link>
        <Link to="/shiftform">Pamainos</Link>
        <Link to="/login">Prisijungimas</Link>
      </nav>
    </div>
  );
}

export default Home;
