import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import DeleteEmployee from './DeleteEmployee';
import AllEmployees from './AllEmployees';


function EmployeePage() {
  const [showAllEmployees, setShowAllEmployees] = useState(false);

  return (
    <div>
      <center><h2>Darbuotojų valdymas</h2></center>

      <button onClick={() => setShowAllEmployees(!showAllEmployees)}>
        {showAllEmployees ? 'Slėpti darbuotojus' : 'Visi darbuotojai'}
      </button>

      {showAllEmployees && <AllEmployees />}

      <center><h3>Pridėti / Redaguoti darbuotoją</h3></center>
      <EmployeeForm />

      <center><h3>Trinti darbuotoją</h3></center>
      <DeleteEmployee />
    </div>
  );
}

export default EmployeePage;
