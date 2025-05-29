// src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Pages/Home';
import EmployeePage from './components/Pages/Employee/EmployeePage';
import ShiftPage from './components/Pages/Shift/ShiftPage';
import Login from './components/Login';
import { useState } from 'react';
import MyShifts from './components/Pages/Shift/MyShifts';

function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        {role === 'admin' && <Route path="/employees" element={<EmployeePage />} />}
        {role === 'admin' && <Route path="/shiftform" element={<ShiftPage />} />}
        {role === 'employee' && <Route path="/myshifts" element={<MyShifts />} />}
      </Routes>
    </Router>
  );
}

export default App;
