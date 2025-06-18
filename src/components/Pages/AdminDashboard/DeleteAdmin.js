import { useState, useEffect } from "react";


const DeleteAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/admins", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nepavyko gauti administratorių sąrašo");
        return res.json();
      })
      .then(setAdmins)
      .catch((err) => alert(err.message));
  }, [token]);

  const deleteAdmin = async (adminId) => {
    if (!window.confirm("Ar tikrai norite ištrinti administratorių?")) return;

    try {
      const response = await fetch(`http://localhost:8080/admins/admin/${adminId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAdmins((prev) => prev.filter((admin) => admin.id !== adminId));
        alert("Administratoriaus ištrynimas sėkmingas");
      } else {
        alert("Klaida ištrinant administratorių");
      }
    } catch (error) {
      alert("Tinklo klaida: " + error.message);
    }
  };

  return (
    <div>
      {admins.length > 0 ? (
        <ul className="list-disc ml-5 space-y-1">
          {admins.map((admin) => (
            <li key={admin.id} className="flex justify-between items-center">
              <div>
                <strong>{admin.name}</strong> – {admin.email}
              </div>
              <button
                onClick={() => deleteAdmin(admin.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Ištrinti
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nėra administratorių</p>
      )}
    </div>
  );
};

export default DeleteAdmin;
