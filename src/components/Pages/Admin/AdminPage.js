import React, { useState } from 'react';
import AddAdmin from './AddAdmin';
import AllAdmins from './AllAdmins';
import DeleteAdmin from './DeleteAdmin';


function AdminPage() {
    const [showAllAdmins, setShowAllAdmins] = useState(false);

    return (
        <div>
            <center><h2>Admin valdymas</h2></center>

            <button onClick={() => setShowAllAdmins(!showAllAdmins)}>
                {showAllAdmins ? 'Slėpti administracija' : 'Visi admin'}
            </button>
            {showAllAdmins && <AllAdmins />}

            <center><h3>Pridėti administratorių</h3></center>
            <AddAdmin />

            <center><h3>Trinti admin</h3></center>
            <DeleteAdmin />
        </div>
    );
}

export default AdminPage;
