import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = ({ setRole, setToken, embedded }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Neteisingi prisijungimo duomenys");
        return;
      }

      const data = await response.json();

      if (!data.token || !data.role) {
        setError("Serveris negrąžino reikalingų duomenų");
        return;
      }

      // Atnaujinam App globalų state
      setToken(data.token);
      setRole(data.role);

      // Sinchronizuojam į localStorage (neprivaloma, jei App jau saugo)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "ADMIN") {
        navigate("/admin");
      } else if (data.role === "EMPLOYEE") {
        navigate("/employee");
      } else {
        setError("Netinkama vartotojo rolė");
      }
    } catch (err) {
      setError("Klaida jungiantis prie serverio");
      console.error("Login klaida:", err);
    }
  };

  return (
    <div className="login-container">
      {!embedded && <h2 className="text-center text-2xl mb-4">Prisijungimas</h2>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Prisijungti</button>
        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
          style={{ cursor: "pointer", color: "blue", marginTop: "10px" }}
        >
          Pamiršai slaptažodį?
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
