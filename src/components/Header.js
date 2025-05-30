import { Link } from 'react-router-dom';
import './Header.css'

function Header({ role, setRole }) {
  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  return (
    <nav>
      <Link to="/">Pagrindinis</Link>{" "}
      {!role && <Link to="/login">Prisijungti</Link>}

      {role === 'admin' && (
        <>
          <Link to="/employees">Darbuotojai</Link>
          <Link to="/shiftform">Pamainos</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={handleLogout}>Atsijungti</button>
        </>
      )}

      {role === 'employee' && (
        <>
          <Link to="/myshifts">Mano pamainos</Link>
          <button onClick={handleLogout}>Atsijungti</button>
        </>
      )}
    </nav>
  );
}

export default Header;
