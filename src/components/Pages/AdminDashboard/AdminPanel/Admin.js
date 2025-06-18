import React, { useEffect, useState } from "react";
import './Admin.css';

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/admins", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nepavyko gauti adminų");
        return res.json();
      })
      .then((data) => {
        setAdmins(data);
        setLoadingAdmins(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingAdmins(false);
      });
  }, [token]);

  if (loadingAdmins) {
    return <div>Kraunama administratorių sąrašas...</div>;
  }

  if (error) {
    return <div>Klaida: {error}</div>;
  }

return (
  <div className="admin-container">
    <h2>Administratorių sąrašas</h2>
    <ul className="admin-list">
      {admins.map((admin) => (
        <li key={admin.id}>
          {admin.name} ({admin.email})
        </li>
      ))}
    </ul>
  </div>
);
};

export default Admins;
