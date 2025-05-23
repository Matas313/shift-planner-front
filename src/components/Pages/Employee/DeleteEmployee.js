import React, { useState } from 'react';
import './DeleteEmployee.css';

function DeleteEmployee() {
  const [employeeId, setEmployeeId] = useState('');

  const handleDelete = () => {
  if (!employeeId) {
    alert("Įveskite darbuotojo ID!");
    return;
  }

  fetch(`http://localhost:8080/admins/${employeeId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        alert('Darbuotojas sėkmingai ištrintas');
        setEmployeeId('');
      } else {
        alert('Nepavyko ištrinti darbuotojo');
      }
    })
    .catch(error => {
      console.error('Klaida:', error);
      alert('Įvyko klaida');
    });
};


  return (
    <div className="delete-employee-container">
      <h3>Ištrinti darbuotoją</h3>
      <label htmlFor="employeeId">Darbuotojo ID</label>
      <input
        id="employeeId"
        type="number"
        value={employeeId}
        onChange={e => setEmployeeId(e.target.value)}
        placeholder="Įveskite ID"
      />
      <button onClick={handleDelete}>Ištrinti</button>
    </div>
  );
}

export default DeleteEmployee;
