import React, { useState } from 'react';
import ShiftForm from './ShiftForm';
import DeleteShift from './DeleteShift';
import AllShifts from './AllShifts';
import Assign from './Assign';

function ShiftPage() {
  const [showAllShifts, setShowAllShifts] = useState(false);

  return (
    <div>
      <h2>Pamainų Valdymas</h2>

      <button onClick={() => setShowAllShifts(!showAllShifts)}>
        {showAllShifts ? 'Slėpti pamainas' : 'Visos pamainos'}
      </button>

      {showAllShifts && <AllShifts />}

      <h3>Pridėti / Redaguoti pamainą</h3>
      <ShiftForm />

      <h3>Trinti pamainą</h3>
      <DeleteShift />

      <h3>Priskirti darbuotoją</h3>
      <Assign />
    </div>
  );
}

export default ShiftPage;
