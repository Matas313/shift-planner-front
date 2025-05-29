'use client';

import React, { useState, useEffect } from 'react';

export default function Assign() {
  const [shiftId, setShiftId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/shifts')
      .then((res) => res.json())
      .then((data) => setShifts(data))
      .catch((err) => setMessage('Nepavyko gauti pamainų: ' + err.message));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/admins/allemployees')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => setMessage('Nepavyko gauti darbuotojų: ' + err.message));
  }, []);

  const assignShiftToEmployee = async (shiftId, employeeId) => {
    try {
      const response = await fetch('http://localhost:8080/shifts/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shiftId, employeeId }),
      });
      if (!response.ok) {
        throw new Error('Nepavyko priskirti pamainos');
      }
      setMessage('Pamaina priskirta sėkmingai!');
    } catch (error) {
      setMessage('Klaida: ' + error.message);
    }
  };

const handleAssignClick = () => {
  if (!shiftId || !employeeId) {
    setMessage('Pasirinkite pamainą ir darbuotoją.');
    return;
  }

  const shiftIdNum = Number(shiftId);
  const employeeIdNum = Number(employeeId);

  if (isNaN(shiftIdNum) || isNaN(employeeIdNum)) {
    setMessage('Pamainos arba darbuotojo ID turi būti skaičiai');
    return;
  }

  assignShiftToEmployee(shiftIdNum, employeeIdNum);
};



  return (
    <div style={{ padding: '20px' }}>
      <h2>Priskirti pamainą darbuotojui</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Pamainos pasirinkimas: </label>
        <select
          value={shiftId}
          onChange={(e) => setShiftId(e.target.value)}
        >
          <option value="">-- Pasirinkite pamainą --</option>
          {shifts.map((shift) => (
            <option key={shift.id} value={shift.id}>
              {shift.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Darbuotojo pasirinkimas: </label>
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">-- Pasirinkite darbuotoją --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleAssignClick}>Priskirti Pamainą</button>

      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
}
