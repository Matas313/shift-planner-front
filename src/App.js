import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Pages/Home';
import EmployeeForm from './components/Pages/Employee/EmployeeForm'
import ShiftForm from './components/Pages/Shift/ShiftForm'


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeeform" element={<EmployeeForm />} />
        <Route path="/shiftform" element={<ShiftForm />} />
      </Routes>

    </Router>
  );
}
export default App;