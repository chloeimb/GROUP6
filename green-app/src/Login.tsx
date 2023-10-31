import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = (event: FormEvent) => {
    event.preventDefault(); // Prevents default form submission
    // Here you can add authentication logic
    if (username && password) {
      history.push('/home');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-field">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="input-field">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
