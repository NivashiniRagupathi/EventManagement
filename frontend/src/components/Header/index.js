import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './index.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
        <img src="https://i.postimg.cc/hPtTjBDT/Screenshot-2024-08-03-161029.png" alt="event-logo" className='image-logo' />

        </Link>
      </div>
      <nav>
        <ul className='nav-list'>
          {user ? (
            <>
            <li>
            <Link className='link-item' to="/">Home</Link>
          </li>
          <li>
            <Link className='link-item' to="/events">Events</Link>
          </li>
          <li>
              <button className='login-nav-btn' onClick={handleLogout}>Logout</button>
            </li>
          </>
          ) : (
            <>
              <li>
                <Link to="/login"><button className='login-nav-btn'>Login</button></Link>
              </li>
              <li>
                <Link to="/signup"><button className='login-nav-btn'>Sign Up</button></Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;