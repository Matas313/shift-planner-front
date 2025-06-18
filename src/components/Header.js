import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ role, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="header-nav">
      <div className="nav-left">
        <Link to="/" className="nav-link">Pagrindinis</Link>
      </div>

      <div className="nav-right">
        {!role && (
          <Link to="/login" className="nav-link">
            Prisijungti
          </Link>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/admin/employees" className="nav-link">
              Darbuotojai
            </Link>
            <Link to="/admin/shifts" className="nav-link">
              Pamainos
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
             <Link to="/admin/profile" className="nav-link">
              Profilis
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Atsijungti
            </button>
          </>
        )}

        {role === "EMPLOYEE" && (
          <>
            <Link to="/employee" className="nav-link">
              Mano pamainos
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Atsijungti
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
