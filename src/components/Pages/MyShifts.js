import React, { useEffect, useState } from 'react';

export default function MyShifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchShifts() {
      try {
        const response = await fetch('http://localhost:8080/employee/shifts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Nepavyko gauti pamainų');
        }

        const data = await response.json();
        setShifts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchShifts();
  }, [token]);

  if (loading) return <p>Kraunama...</p>;
  if (error) return <p>Klaida: {error}</p>;

  return (
    <div>
      <h2>Mano pamainos</h2>
      {shifts.length === 0 && <p>Neturi pamainų.</p>}
      <ul>
        {shifts.map(shift => (
          <li key={shift.id}>
            Data: {shift.date} | Laikas: {shift.startTime} - {shift.endTime} | Darbas: {shift.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
