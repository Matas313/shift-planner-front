import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav-links">
        <Link to="/">Pagrindinis</Link>
        <Link to="/employees">Darbuotojai</Link>
        <Link to="/shiftform">Pamainos</Link>
        <Link to="/login">Prisijungimas</Link>



      </nav>
    </header>
  );
}

export default Header;
