// ShiftCalendar.js
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";

const ShiftCalendar = ({ shifts, employees, onShiftUpdate }) => {
  const [filteredShifts, setFilteredShifts] = useState(shifts);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [selectedShift, setSelectedShift] = useState(null);

  useEffect(() => {
    if (selectedEmployeeId === "all") {
      setFilteredShifts(shifts);
    } else {
      setFilteredShifts(
        shifts.filter((s) => String(s.employee?.id || s.employeeId) === String(selectedEmployeeId))
      );
    }
  }, [selectedEmployeeId, shifts]);

  const handleEventDrop = (info) => {
    const updatedShift = {
      ...info.event.extendedProps.shift,
      start: info.event.start,
      end: info.event.end,
    };
    onShiftUpdate(updatedShift);
  };

  const handleEventClick = (info) => {
    setSelectedShift(info.event.extendedProps.shift);
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date - tzOffset).toISOString().slice(0, 16);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="mb-4 flex gap-2 items-center">
        <label>Filtruoti pagal darbuotoją:</label>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Visi</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        droppable={true}
        events={filteredShifts.map((shift) => ({
          id: String(shift.id),
          title: `${shift.employee?.firstName ?? ""} ${shift.employee?.lastName ?? ""} (${shift.name ?? ""})`,
          start: shift.startTime || shift.start,
          end: shift.endTime || shift.end,
          extendedProps: { shift },
        }))}
        eventDrop={handleEventDrop}
        eventClick={handleEventClick}
      />

      {selectedShift && (
        <div className="mt-4 p-4 border rounded">
          <h3>Redaguoti pamainą</h3>
          <label>
            Pavadinimas:
            <input
              type="text"
              value={selectedShift.name || ""}
              onChange={(e) =>
                setSelectedShift({ ...selectedShift, name: e.target.value })
              }
              className="border p-1 ml-2"
            />
          </label>
          <br />

          <label>
            Pradžia:
            <input
              type="datetime-local"
              value={formatDateForInput(new Date(selectedShift.startTime || selectedShift.start))}
              onChange={(e) =>
                setSelectedShift({
                  ...selectedShift,
                  startTime: e.target.value,
                  start: new Date(e.target.value),
                })
              }
              className="border p-1 ml-2"
            />
          </label>
          <br />

          <label>
            Pabaiga:
            <input
              type="datetime-local"
              value={formatDateForInput(new Date(selectedShift.endTime || selectedShift.end))}
              onChange={(e) =>
                setSelectedShift({
                  ...selectedShift,
                  endTime: e.target.value,
                  end: new Date(e.target.value),
                })
              }
              className="border p-1 ml-2"
            />
          </label>
          <br />

          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              onShiftUpdate(selectedShift);
              setSelectedShift(null);
            }}
          >
            Išsaugoti
          </button>
          <button
            className="mt-2 ml-2 bg-gray-300 px-4 py-2 rounded"
            onClick={() => setSelectedShift(null)}
          >
            Atšaukti
          </button>
        </div>
      )}
    </div>
  );
};

export default ShiftCalendar;
