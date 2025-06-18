import { useState } from "react";

import "./AddAdmin.css"

const AddAdmin = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/admins/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(admin)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Nepavyko pridėti administratoriaus");
        return res.json();
      })
      .then((data) => {
        setMessage("Administratorius pridėtas sėkmingai!");
        setAdmin({ name: "", email: "", password: "" });
      })
      .catch((err) => setMessage(err.message));
  };

  return (
    <div className="add-admin-form">
      <h2>Pridėti naują administratorių</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={admin.name}
          onChange={handleChange}
          placeholder="Vardas"
          required
        />
        <input
          type="email"
          name="email"
          value={admin.email}
          onChange={handleChange}
          placeholder="El. paštas"
          required
        />
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
          placeholder="Slaptažodis"
          required
        />
        <button type="submit">Pridėti administratorių</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAdmin;
