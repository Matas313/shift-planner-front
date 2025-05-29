import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Pages/Home';
import EmployeePage from './components/Pages/Employee/EmployeePage';
import ShiftPage from './components/Pages/Shift/ShiftPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/shiftform" element={<ShiftPage />} />
      </Routes>
    </Router>
  );
}

export default App;
