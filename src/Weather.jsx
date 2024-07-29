import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './Weather.css';

const Weather = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');



  const fetchWeather = async () => {
    try {
      setError('');
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0b44de9499fb721f48a7d4b2c769d79f&units=metric`
      );
      setWeatherData(weatherResponse.data);
    } catch (error) {
      setError('Error fetching the weather data. Please check the coordinates and try again.');
      console.error('Error fetching the weather data', error);
    }
  };



  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)} 
          placeholder="Enter latitude" 
        />
        <input 
          type="text" 
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)} 
          placeholder="Enter longitude" 
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-details">
          <h2>Current Weather</h2>
          <p>Location: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Sunrise: {weatherData.sys.sunrise}</p>
          <p>Sunset: {weatherData.sys.sunset}</p>
        
        </div>
      )}
 {weatherData && weatherData.coord && (
        <div className="map-container">
          <MapContainer 
            center={[weatherData.coord.lat, weatherData.coord.lon]} 
            zoom={10} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
              position={[weatherData.coord.lat, weatherData.coord.lon]}
              
            >
              <Popup>
             <li><strong>Place :  {weatherData.name}</strong></li>
                <li> longitute :{weatherData.coord.lon}</li>
                <li> latitute :{weatherData.coord.lat}</li>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
   
    </div>
  );
};

export default Weather;
