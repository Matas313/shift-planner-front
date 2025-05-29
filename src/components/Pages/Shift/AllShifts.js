import React, { useEffect, useState } from 'react';

function AllShifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/shifts')
      .then(res => {
        if (!res.ok) throw new Error('Klaida užklausant pamainas');
        return res.json();
      })
      .then(data => {
        setShifts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Kraunasi pamainos...</p>;
  if (error) return <p>Klaida: {error}</p>;

  return (
    <div>
      <h3>Visos pamainos:</h3>
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            <b>ID:</b> {shift.id} | <b>Pavadinimas:</b> {shift.name} | <b>Pradžia:</b> {shift.startTime} | <b>Pabaiga:</b> {shift.endTime} | <b>Darbuotojas:</b> {shift.employee ? shift.employee.name : 'Nėra priskirta'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllShifts;
