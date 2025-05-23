import EmployeeForm from './EmployeeForm';
import DeleteEmployee from './DeleteEmployee';

function EmployeePage() {
  return (
    <div>
      <h2>Darbuotojai</h2>
      <EmployeeForm />
      <DeleteEmployee />
    </div>
  );
}

export default EmployeePage;
