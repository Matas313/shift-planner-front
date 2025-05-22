import { useState } from 'react';
import './ShiftForm.css';


const ShiftForm = () => {
  const [shift, setShift] = useState({
    name: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setShift({ ...shift, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/shifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shift)
    });

    if (response.ok) {
      alert('Darbo pamaina sukurta');
      setShift({ name: '', startTime: '', endTime: '' });
    } else {
      alert('Klaida kuriant pamaina');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pridėti pamaina</h2>
      <input name="name" placeholder="Pamainos pavadinimas" value={shift.name} onChange={handleChange} />
      <input name="startTime" placeholder="Pradzia" value={shift.startTime} onChange={handleChange} />
      <input name="endTime" placeholder="Pabaiga" value={shift.endTime} onChange={handleChange} />
      <button type="submit">Pridėti</button>
    </form>
  );
};

export default ShiftForm;
