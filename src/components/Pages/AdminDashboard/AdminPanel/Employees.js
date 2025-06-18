import { useEffect, useState } from "react";
import EmployeeEdit from "./EmployeeEdit";
import './Employee.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    password: "",
  });
  const [selectedShiftId, setSelectedShiftId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [assignMessage, setAssignMessage] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const token = localStorage.getItem("token");

  const getMonthlyHours = (shifts) => {
    if (!shifts || shifts.length === 0) return 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalMs = 0;

    shifts.forEach((shift) => {
      const start = new Date(shift.startTime);
      const end = new Date(shift.endTime);

      if (start.getMonth() === currentMonth && start.getFullYear() === currentYear) {
        totalMs += end - start;
      }
    });

    return totalMs / (1000 * 60 * 60);
  };

  // Užkrauname darbuotojus ir pamainas
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8080/admins/allemployees", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
      fetch("http://localhost:8080/shifts", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([employeesData, shiftsData]) => {
        console.log("Darbuotojai:", employeesData);
        console.log("Pamainos:", shiftsData);
        console.log("Visos pamainos:", shiftsData);
        console.log("Pirmas shift objektas:", shiftsData[0]);
        shiftsData.forEach(shift => {
          console.log("Shift employeeId:", shift.employeeId);
        });

        const getMonthlyHours = (shifts) => {
          if (!shifts || shifts.length === 0) return 0;

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          let totalMs = 0;

          shifts.forEach((shift) => {
            const start = new Date(shift.startTime);
            const end = new Date(shift.endTime);

            console.log(`Pamaina: startas ${start}, pabaiga ${end}`);

            if (
              start.getMonth() === currentMonth &&
              start.getFullYear() === currentYear
            ) {
              const diff = end - start;
              console.log(`Pamainos trukmė (ms):`, diff);
              totalMs += diff;
            }
          });

          const hours = totalMs / (1000 * 60 * 60);
          console.log(`Viso valandų per mėnesį:`, hours);
          return hours;
        };

        const employeesWithShifts = employeesData.map((emp) => {
          const empShifts = shiftsData.filter(
            (shift) => shift.employee && shift.employee.id === emp.id
          );

          const totalHours = getMonthlyHours(empShifts);
          return {
            ...emp,
            shifts: empShifts,
            totalHours,
          };
        });

        setEmployees(employeesWithShifts);
        setShifts(shiftsData);
      })
      .catch((err) => {
        console.error("Klaida gaunant darbuotojus arba pamainas:", err);
      });
  }, [token]);

  // Pridedame naują darbuotoją
  const addEmployee = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/admins/addemployees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newEmployee, role: "EMPLOYEE" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nepavyko pridėti darbuotojo");
        return res.json();
      })
      .then((data) => {
        setEmployees((prev) => [
          ...prev,
          { ...data, shifts: [], totalHours: 0 },
        ]);
        setNewEmployee({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          position: "",
          password: "",
        });
      })
      .catch((err) => alert("Klaida: " + err.message));
  };

  // Priskiriame darbuotoją pamainai
  const assignEmployeeToShift = (e) => {
    e.preventDefault();
    if (!selectedShiftId || !selectedEmployeeId) {
      setAssignMessage("Pasirinkite pamainą ir darbuotoją.");
      return;
    }

    fetch(`http://localhost:8080/shifts/${selectedShiftId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ employeeId: Number(selectedEmployeeId) }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nepavyko priskirti darbuotojo pamainai");
        return res.json();
      })
      .then(() => {
        setAssignMessage("Darbuotojas sėkmingai priskirtas pamainai.");
        setSelectedShiftId("");
        setSelectedEmployeeId("");
        return Promise.all([
          fetch("http://localhost:8080/admins/allemployees", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.json()),
          fetch("http://localhost:8080/shifts", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => res.json()),
        ]);
      })
      .then(([employeesData, shiftsData]) => {
        const employeesWithShifts = employeesData.map((emp) => {
          const empShifts = shiftsData.filter((shift) => shift.employeeId === emp.id);
          return {
            ...emp,
            shifts: empShifts,
            totalHours: getMonthlyHours(empShifts),
          };
        });
        setEmployees(employeesWithShifts);
        setShifts(shiftsData);
      })
      .catch((err) => setAssignMessage("Klaida: " + err.message));
  };

  // Ištriname darbuotoją
  const deleteEmployee = async (employeeId) => {
    try {
      const res = await fetch(`http://localhost:8080/admins/employee/${employeeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
        alert("Darbuotojas ištrintas");
      } else {
        alert("Klaida ištrinant darbuotoją");
      }
    } catch (err) {
      alert("Tinklo klaida: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pridėti darbuotoją */}
      <form onSubmit={addEmployee} className="employee-form">
        <h2>Pridėti darbuotoją</h2>
        <input
          type="text"
          placeholder="Vardas"
          value={newEmployee.firstName}
          onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Pavardė"
          value={newEmployee.lastName}
          onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="El. paštas"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefonas"
          value={newEmployee.phone}
          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Pareigos"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={newEmployee.password}
          onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
          required
        />
        <button type="submit">Pridėti</button>
      </form>

      {/* Priskirti darbuotoją pamainai */}
      <form onSubmit={assignEmployeeToShift} className="employee-form">
        <h2>Priskirti darbuotoją pamainai</h2>
        <select
          value={selectedShiftId}
          onChange={(e) => setSelectedShiftId(e.target.value)}
          required
        >
          <option value="">Pasirinkite pamainą</option>
          {shifts.map((shift) => (
            <option key={shift.id} value={shift.id}>
              {shift.name}
            </option>
          ))}
        </select>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          required
        >
          <option value="">Pasirinkite darbuotoją</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{ backgroundColor: "#28a745", color: "white" }}
        >
          Priskirti
        </button>
        {assignMessage && <p className="mt-2 text-sm">{assignMessage}</p>}
      </form>

      {/* Darbuotojų sąrašas */}
      <ul className="employee-list">
        {employees.map((emp) => (
          <li key={emp.id}>
            <div className="info">
              <p>
                {emp.firstName} {emp.lastName} – {emp.email} – {emp.phone} – {emp.position}
              </p>
              <small>
                Pradirbo šį mėnesį:{" "}
                <strong>{emp.totalHours ? emp.totalHours.toFixed(1) : "0.0"} val.</strong>
              </small>
            </div>
            <div className="buttons">
              <button
                onClick={() => setEditingEmployee(emp)}
                className="edit"
                type="button"
              >
                Redaguoti
              </button>
              <button
                onClick={() => deleteEmployee(emp.id)}
                className="delete"
                type="button"
              >
                Ištrinti
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* EmployeeEdit komponentas */}
      {editingEmployee && (
        <EmployeeEdit
          employee={editingEmployee}
          token={token}
          onSave={(updatedEmployee) => {
            setEmployees((prev) =>
              prev.map((emp) =>
                emp.id === updatedEmployee.id
                  ? { ...updatedEmployee, shifts: emp.shifts, totalHours: emp.totalHours }
                  : emp
              )
            );
            setEditingEmployee(null);
          }}
          onCancel={() => setEditingEmployee(null)}
        />
      )}
    </div>
  );
};

export default Employees;
