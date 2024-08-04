import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth functions
export const registerUser = (email, password) => api.post('/register', { email, password });

export const loginUser = (email, password) => api.post('/login', { email, password });

// Event functions
export const createEvent = (token, event) =>
  api.post('/events', event, { headers: { Authorization: `Bearer ${token}` } });

export const getEvents = (token) =>
  api.get('/events', { headers: { Authorization: `Bearer ${token}` } });

export const updateEvent = (token, id, event) =>
  api.put(`/events/${id}`, event, { headers: { Authorization: `Bearer ${token}` } });

export const deleteEvent = (token, id) =>
  api.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Weather function
export const getWeather = (location) => api.get(`/weather/${location}`);