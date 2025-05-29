import React, { useEffect, useState } from 'react';

function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/admins/allemployees')
      .then(response => {
        if (!response.ok) {
          throw new Error('Tinklo klaida');
        }
        return response.json();
      })
      .then(data => {
        setEmployees(data);
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
      <h3>Visi darbuotojai:</h3>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.name} ({emp.position}) ({emp.shift})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllEmployees;
