import './Login.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setRole('admin');
      navigate('/');
    } else if (username === 'darbuotojas' && password === 'darb') {
      setRole('employee');
      navigate('/myshifts');
    } else {
      setError('Neteisingi prisijungimo duomenys');
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Vartotojo vardas"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Slaptažodis"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleLogin}>Prisijungti</button>
    </div>
  );
}

export default Login;
