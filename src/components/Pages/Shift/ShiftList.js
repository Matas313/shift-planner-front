import { useState } from 'react';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    possition: ''
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    });

    if (response.ok) {
      alert('Darbuotojas pridėtas!');
      setEmployee({ name: '', email: '', phone: '', possition: '' });
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
      <input name="possition" placeholder="Pareigos" value={employee.possition} onChange={handleChange} />
      <button type="submit">Pridėti</button>
    </form>
  );
};

export default EmployeeForm;
