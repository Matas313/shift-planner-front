import React, { useState } from 'react';
import './DeleteShift.css';

function DeleteEmployee() {
  const [shiftId, setShiftId] = useState('');

  const handleDelete = () => {
    if (!shiftId || isNaN(shiftId)) {
      alert("Įveskite galiojantį pamainos ID!");
      return;
    }

    fetch(`http://localhost:8080/shifts/${shiftId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          alert('Pamaina sėkmingai ištrinta');
          setShiftId('');
        } else {
          alert('Nepavyko ištrinti pamainos');
        }
      })
      .catch(error => {
        console.error('Klaida:', error);
        alert('Įvyko klaida');
      });
  };

  return (
    <div className="delete-employee-container">
      <h3>Ištrinti pamainą</h3>
      <label htmlFor="shiftId">Pamainos ID</label>
      <input
        id="shiftId"
        type="number"
        value={shiftId}
        onChange={e => setShiftId(e.target.value)}
        placeholder="Įveskite ID"
      />
      <button onClick={handleDelete}>Ištrinti</button>
    </div>
  );
}

export default DeleteEmployee;
