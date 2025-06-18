import React, { useState, useEffect } from "react";
import "./EmployeeEdit.css";

const EmployeeEdit = ({ employee, token, onSave, onCancel }) => {
  const [editData, setEditData] = useState(employee);

  useEffect(() => {
    setEditData(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/admins/employee/${editData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Klaida atnaujinant darbuotoją");
      const updatedEmployee = await res.json();
      onSave(updatedEmployee);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!editData) return null;

  return (
    <form onSubmit={handleSubmit} className="employee-edit-form">
      <h2>Redaguoti darbuotoją</h2>
      <input
        name="firstName"
        value={editData.firstName}
        onChange={handleChange}
        placeholder="Vardas"
        required
      />
      <input
        name="lastName"
        value={editData.lastName}
        onChange={handleChange}
        placeholder="Pavardė"
        required
      />
      <input
        name="email"
        type="email"
        value={editData.email}
        onChange={handleChange}
        placeholder="El. paštas"
        required
      />
      <input
        name="phone"
        value={editData.phone}
        onChange={handleChange}
        placeholder="Telefonas"
        required
      />
      <input
        name="position"
        value={editData.position}
        onChange={handleChange}
        placeholder="Pareigos"
        required
      />
      <div>
        <button type="submit">Išsaugoti</button>
        <button type="button" onClick={onCancel}>Atšaukti</button>
      </div>
    </form>
  );
};

export default EmployeeEdit;
