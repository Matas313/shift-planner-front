import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prisijungimo duomenys:', { email, password });
    alert(`Bandai prisijungti su:\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Slaptažodis:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Prisijungti</button>
      </form>
    </div>
  );
}

export default Login;
