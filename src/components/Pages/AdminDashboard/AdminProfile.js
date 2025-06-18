import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/admins/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Klaida gaunant profilio duomenis");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setForm(data);
      })
      .catch(() => navigate("/login"));
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage(null);
    setErrorMessage(null);

    fetch("http://localhost:8080/admins/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Klaida išsaugant duomenis.");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setStatusMessage("Profilis sėkmingai išsaugotas.");
      })
      .catch((error) => {
        setErrorMessage(error.message || "Įvyko klaida.");
      });
  };

  if (!profile) return <p>Kraunama...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Mano profilis</h2>

      {statusMessage && (
        <div className="text-green-600 font-semibold">{statusMessage}</div>
      )}
      {errorMessage && (
        <div className="text-red-600 font-semibold">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="firstName"
          value={form.firstName || ""}
          onChange={handleChange}
          placeholder="Vardas"
          className="w-full border p-2"
          required
        />
        <input
          name="lastName"
          value={form.lastName || ""}
          onChange={handleChange}
          placeholder="Pavardė"
          className="w-full border p-2"
          required
        />
        <input
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Telefonas"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Išsaugoti
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
