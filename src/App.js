import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Pages/Home';
import EmployeePage from './components/Pages/Admin/EmployeePage';
import ShiftPage from './components/Pages/Shift/ShiftPage';
import Login from './components/Login';
import MyShifts from './components/Pages/Employee/MyShifts';
import { useState } from 'react';

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  return (
    <Router>
      <Header role={role} setRole={setRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        
        {role === 'admin' && (
          <>
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/shiftform" element={<ShiftPage />} />
          </>
        )}

        {role === 'employee' && (
          <>
            <Route path="/myshifts" element={<MyShifts />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
