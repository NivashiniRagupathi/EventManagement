import React, { useState } from 'react';
import { getWeather } from '../../api';
import './index.css'; // Import CSS file

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleFetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await getWeather(location);
      setWeatherData(response.data);
    } catch (error) {
      setError('Failed to fetch weather data.');
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>
      <form onSubmit={handleFetchWeather} className="weather-form">
        <div>
          <label>Enter Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="e.g., New York"
          />
        </div>
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-result">
          <h3>Weather in {weatherData.location}</h3>
          <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
          <p><strong>Condition:</strong> {weatherData.condition}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;