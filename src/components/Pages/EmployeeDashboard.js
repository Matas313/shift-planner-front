import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [shifts, setShifts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/employees/myshifts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Nepavyko gauti pamainų");
        }
        return res.json();
      })
      .then(setShifts)
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, [token, navigate]);

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const now = new Date();
  const pastShifts = shifts.filter((s) => new Date(s.endTime) < now);
  const upcomingShifts = shifts.filter((s) => new Date(s.endTime) >= now);

  // Apskaičiuojame pradirbtas valandas einamam mėnesiui
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const totalHours = shifts
    .filter((shift) => {
      const start = new Date(shift.startTime);
      return start.getMonth() === thisMonth && start.getFullYear() === thisYear;
    })
    .reduce((total, shift) => {
      const start = new Date(shift.startTime);
      const end = new Date(shift.endTime);
      const hours = (end - start) / (1000 * 60 * 60);
      return total + hours;
    }, 0)
    .toFixed(1);

  const renderShift = (shift) => (
    <li key={shift.id} className="border p-2 rounded">
      <strong>{shift.name}</strong> | {shift.shiftDate} |{" "}
      {formatTime(shift.startTime)}–{formatTime(shift.endTime)}
    </li>
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Darbuotojo Valdymas</h1>
        <button
          onClick={() => navigate("/employee/profile")}
          className="text-blue-600 underline"
        >
          Mano profilis
        </button>
      </div>

      <div className="total-hours-box">
        Iš viso pradirbta šį mėnesį: <strong>{totalHours} val.</strong>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Laukiančios pamainos</h2>
        {upcomingShifts.length === 0 ? (
          <p>Šiuo metu neturi laukiančių pamainų.</p>
        ) : (
          <ul className="space-y-2">{upcomingShifts.map(renderShift)}</ul>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Praėjusios pamainos</h2>
        {pastShifts.length === 0 ? (
          <p>Nėra įvykusių pamainų.</p>
        ) : (
          <ul className="space-y-2">{pastShifts.map(renderShift)}</ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
