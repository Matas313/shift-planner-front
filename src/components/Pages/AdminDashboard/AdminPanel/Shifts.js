import { useEffect, useState } from "react";
import "./Shifts.css";

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    name: "",
    shiftDate: "",  // pridėta shiftDate
    startTime: "",
    endTime: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/shifts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP klaida: ${res.status}`);
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then(setShifts)
      .catch((err) => console.error("Pamainų gavimo klaida", err));
  }, [token]);

  const addShift = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Nėra prisijungimo tokeno");
      return;
    }

    if (!newShift.shiftDate) {
      alert("Pasirinkite pamainos datą");
      return;
    }

    // Konstruojam pilnus ISO laikus
    const payload = {
      name: newShift.name,
      shiftDate: newShift.shiftDate, // siųsti shiftDate kaip yyyy-MM-dd
      startTime: `${newShift.shiftDate}T${newShift.startTime}:00`,
      endTime: `${newShift.shiftDate}T${newShift.endTime}:00`,
    };

    fetch("http://localhost:8080/shifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "Nepavyko pridėti pamainos");
        }
        return res.json();
      })
      .then((data) => {
        setShifts((prev) => [...prev, data]);
        setNewShift({ name: "", shiftDate: "", startTime: "", endTime: "" });
      })
      .catch((err) => alert("Klaida pridedant pamainą: " + err.message));
  };

  const deleteShift = async (shiftId) => {
    if (!token) {
      alert("Nėra prisijungimo tokeno");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/shifts/${shiftId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Nepavyko ištrinti pamainos");
      }
      setShifts((prev) => prev.filter((s) => s.id !== shiftId));
    } catch (err) {
      alert("Tinklo klaida: " + err.message);
    }
  };

  const formatTime = (isoDateString) => {
    if (!isoDateString) return "";
    const date = new Date(isoDateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="shift-container">
      <form onSubmit={addShift} className="shift-form">
        <h2>Pridėti pamainą</h2>
        <input
          type="text"
          placeholder="Pamainos pavadinimas"
          value={newShift.name}
          onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
          required
        />
        <input
          type="date"  // pridėtas date input
          value={newShift.shiftDate}
          onChange={(e) => setNewShift({ ...newShift, shiftDate: e.target.value })}
          required
        />
        <input
          type="time"
          value={newShift.startTime}
          onChange={(e) =>
            setNewShift({ ...newShift, startTime: e.target.value })
          }
          required
        />
        <input
          type="time"
          value={newShift.endTime}
          onChange={(e) =>
            setNewShift({ ...newShift, endTime: e.target.value })
          }
          required
        />
        <button>Pridėti</button>
      </form>

      <div className="shift-list">
        <h2>Pamainos</h2>
        <ul>
          {shifts.map((shift) => (
            <li key={shift.id} className="shift-item">
              <span>
                {shift.name} — {formatTime(shift.startTime)} iki {formatTime(shift.endTime)} ({shift.shiftDate})
              </span>
              <button onClick={() => deleteShift(shift.id)}>Ištrinti</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shifts;
