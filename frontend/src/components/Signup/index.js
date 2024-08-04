import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import './index.css'; // Import CSS file

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate('/login');
    } catch (error) {
      setError('Signup failed: ' + error.response.data.error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;