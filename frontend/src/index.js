import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/AuthContext';

// Get the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

