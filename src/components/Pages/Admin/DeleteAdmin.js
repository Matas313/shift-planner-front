import React, { useState } from 'react';
import './DeleteEmployee.css';

function DeleteAdmin() {
  const [adminId, setAdminId] = useState('');

  const handleDelete = () => {
  if (!adminId) {
    alert("Įveskite Admin ID!");
    return;
  }

  fetch(`http://localhost:8080/admins/${adminId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        alert('Admin sėkmingai ištrintas');
        setAdminId('');
      } else {
        alert('Nepavyko ištrinti admin');
      }
    })
    .catch(error => {
      console.error('Klaida:', error);
      alert('Įvyko klaida');
    });
};


  return (
    <div className="delete-employee-container">
      <h3>Ištrinti admin</h3>
      <label htmlFor="adminId">Admin ID</label>
      <input
        id="adminId"
        type="number"
        value={adminId}
        onChange={e => setAdminId(e.target.value)}
        placeholder="Įveskite ID"
      />
      <button onClick={handleDelete}>Ištrinti</button>
    </div>
  );
}

export default DeleteAdmin;
