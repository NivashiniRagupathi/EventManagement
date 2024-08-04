import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import the CSS file

const Home = () => (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Event Manager</h1>
        <p>Plan and manage your events with ease</p>
      </header>
      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Create Events</h3>
            <p>Easily create and customize your events.</p>
            <Link to="/events" className="btn">Get Started</Link>
          </div>
          <div className="feature-card">
            <h3>Manage Events</h3>
            <p>Keep track of all your events and make updates effortlessly.</p>
            <Link to="/events" className="btn">Manage Now</Link>
          </div>
          <div className="feature-card">
            <h3>Check Weather</h3>
            <p>Get the latest weather updates for your event locations.</p>
            <Link to="/weather" className="btn">Check Weather</Link>
          </div>
        </div>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>
          Event Manager is a comprehensive solution for planning and managing events. Our
          platform allows you to create, update, and manage events effortlessly. We also
          provide real-time weather updates to help you plan your events better.
        </p>
      </section>
    </div>
  );

export default Home;