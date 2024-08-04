import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './index.css'; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Login failed: ' + error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;