import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../../api';
import './index.css';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [editEventId, setEditEventId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents(user.token);
        setEvents(events.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, [user.token]);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editEventId) {
        await updateEvent(user.token, editEventId, { name, date, location, description });
        setEditEventId(null);
      } else {
        await createEvent(user.token, { name, date, location, description });
      }
      setName('');
      setDate('');
      setLocation('');
      setDescription('');
      setError('');
      const events = await getEvents(user.token);
      setEvents(events.data);
    } catch (error) {
      setError('Failed to save event: ' + error.response.data.error);
    }
  };

  const handleEdit = (event) => {
    setName(event.name);
    setDate(event.date);
    setLocation(event.location);
    setDescription(event.description);
    setEditEventId(event.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(user.token, id);
      const events = await getEvents(user.token);
      setEvents(events.data);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  return (
    <div className="events">
      <h2>Events</h2>
      <form onSubmit={handleCreateOrUpdate}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">{editEventId ? 'Update Event' : 'Create Event'}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <h3>Your Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h4>{event.name}</h4>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;