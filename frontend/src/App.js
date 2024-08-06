import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Events from './components/Events';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Weather from './components/Weather';
import './App.css';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route exact path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route exact path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;