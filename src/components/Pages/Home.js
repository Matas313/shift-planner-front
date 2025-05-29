import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>shift-planner</h1>
            <nav className="home-nav">
                <Link to="/employeeform">Darbuotojai</Link>
                <Link to="/shiftform">Pamainos</Link>
                <a href="/login">Prisijungimas</a>


            </nav>
        </div>
    );
}

export default Home;
