import { useState } from 'react';
import './EmployeeForm.css';


const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/admins/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    });
    

    if (response.ok) {
      alert('Darbuotojas pridėtas!');
      setAdmin({ name: '', email: '', phone: '', position: '' });
    } else {
      alert('Klaida pridedant darbuotoją');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pridėti administratorių</h2>
      <input name="name" placeholder="Vardas" value={admin.name} onChange={handleChange} />
      <input name="email" placeholder="El. paštas" value={admin.email} onChange={handleChange} />
      <input name="phone" placeholder="Telefonas" value={admin.phone} onChange={handleChange} />
      <input name="position" placeholder="Pareigos" value={admin.position} onChange={handleChange} />
      <button type="submit">Pridėti</button>
    </form>
  );
};

export default AddAdmin;
