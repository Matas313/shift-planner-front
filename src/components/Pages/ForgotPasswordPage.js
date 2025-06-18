import React, { useState } from "react";
import "./ForgetPasword.css"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Klaida keičiant slaptažodį");
        return;
      }

      const data = await response.text();
      setMessage(data || "Slaptažodis sėkmingai pakeistas");
      setEmail("");
      setNewPassword("");
    } catch (err) {
      setError("Nepavyko prisijungti prie serverio");
      console.error(err);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Slaptažodžio keitimas</h2>
      <form onSubmit={handleReset} className="forgot-password-form">
        <input
          type="email"
          placeholder="El. paštas"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Naujas slaptažodis"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Pakeisti slaptažodį</button>
      </form>

      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
