// ShiftCalendarWrapper.js
import React, { useState, useEffect } from "react";
import ShiftCalendar from "./ShiftCalendar";

const ShiftCalendarWrapper = () => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = token ? `Bearer ${token}` : "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: authHeader,
        };

        const [shiftsRes, employeesRes] = await Promise.all([
          fetch("http://localhost:8080/shifts", { headers }),
          fetch("http://localhost:8080/admins/allemployees", { headers }),
        ]);

        if (!shiftsRes.ok) throw new Error("Failed to fetch shifts");
        if (!employeesRes.ok) throw new Error("Failed to fetch employees");

        const shiftsData = await shiftsRes.json();
        const employeesData = await employeesRes.json();

        // Formatuojam datas, kad būtų Date objektai
        const formattedShifts = shiftsData.map((shift) => ({
          ...shift,
          start: shift.startTime ? new Date(shift.startTime) : null,
          end: shift.endTime ? new Date(shift.endTime) : null,
        }));

        setShifts(formattedShifts);
        setEmployees(employeesData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authHeader]);

  const onShiftUpdate = async (updatedShift) => {
    try {
      const employeeId = updatedShift.employee?.id || updatedShift.employeeId;

      const dto = {
        shiftDate: updatedShift.startTime
          ? updatedShift.startTime.slice(0, 10)
          : updatedShift.start
          ? updatedShift.start.toISOString().slice(0, 10)
          : null,
        startTime: updatedShift.startTime
          ? updatedShift.startTime
          : updatedShift.start
          ? updatedShift.start.toISOString().slice(0, 19)
          : null,
        endTime: updatedShift.endTime
          ? updatedShift.endTime
          : updatedShift.end
          ? updatedShift.end.toISOString().slice(0, 19)
          : null,
        name: updatedShift.name,
        employee: { id: employeeId },
      };

      const res = await fetch(`http://localhost:8080/shifts/${updatedShift.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update shift: ${res.status} ${errorText}`);
      }

      const updatedData = await res.json();

      setShifts((prev) =>
        prev.map((shift) =>
          shift.id === updatedData.id
            ? {
                ...shift,
                name: updatedData.name,
                startTime: updatedData.startTime,
                endTime: updatedData.endTime,
                start: updatedData.startTime ? new Date(updatedData.startTime) : null,
                end: updatedData.endTime ? new Date(updatedData.endTime) : null,
                employee: updatedData.employee,
                shiftDate: updatedData.shiftDate,
              }
            : shift
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Unknown error");
    }
  };

  if (loading) return <div>Kraunasi pamainos ir darbuotojai...</div>;
  if (error) return <div>Klaida: {error}</div>;

  return (
    <ShiftCalendar shifts={shifts} employees={employees} onShiftUpdate={onShiftUpdate} />
  );
};

export default ShiftCalendarWrapper;
