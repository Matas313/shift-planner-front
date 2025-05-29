import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import DeleteEmployee from './DeleteEmployee';
import AllEmployees from './AllEmployees';

function EmployeePage() {
  const [showAllEmployees, setShowAllEmployees] = useState(false);

  return (
    <div>
      <h2>Darbuotojų valdymas</h2>

      <button onClick={() => setShowAllEmployees(!showAllEmployees)}>
        {showAllEmployees ? 'Slėpti darbuotojus' : 'Visi darbuotojai'}
      </button>

      {showAllEmployees && <AllEmployees />}

      <h3>Pridėti / Redaguoti darbuotoją</h3>
      <EmployeeForm />

      <h3>Trinti darbuotoją</h3>
      <DeleteEmployee />
    </div>
  );
}

export default EmployeePage;
