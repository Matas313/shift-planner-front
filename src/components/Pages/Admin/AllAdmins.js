import React, { useEffect, useState } from 'react';

function AllAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/admins')
      .then(response => {
        if (!response.ok) {
          throw new Error('Tinklo klaida');
        }
        return response.json();
      })
      .then(data => {
        setAdmins(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Kraunasi...</p>;
  if (error) return <p>Klaida: {error}</p>;

  return (
    <div>
      <h3>Visi admin:</h3>
      <ul>
        {admins.map(emp => (
          <li key={emp.id}>
            {emp.name} ({emp.position}){' '}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default AllAdmins;
