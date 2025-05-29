import { useState } from 'react';
import './EmployeeForm.css';


const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/admins/addemployees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    });
    

    if (response.ok) {
      alert('Darbuotojas pridėtas!');
      setEmployee({ name: '', email: '', phone: '', position: '' });
    } else {
      alert('Klaida pridedant darbuotoją');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pridėti darbuotoją</h2>
      <input name="name" placeholder="Vardas" value={employee.name} onChange={handleChange} />
      <input name="email" placeholder="El. paštas" value={employee.email} onChange={handleChange} />
      <input name="phone" placeholder="Telefonas" value={employee.phone} onChange={handleChange} />
      <input name="position" placeholder="Pareigos" value={employee.position} onChange={handleChange} />
      <button type="submit">Pridėti</button>
    </form>
  );
};

export default EmployeeForm;
