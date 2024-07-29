import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import WeatherDetails from './components/WeatherDetails';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo';
import './App.css';

// OpenWeather API key
const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; 
// Weather API endpoint
const WEATHER_API_ENDPOINT = process.env.REACT_APP_WEATHER_API_ENDPOINT;
// Geolocator API key
const GEOLOCATOR_API_KEY = process.env.REACT_APP_GEOLOCATOR_API_KEY;

// Default city for weather data fetch
const DEFAULT_CITY = 'Atlanta,US';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [defaultCity, setDefaultCity] = useState(DEFAULT_CITY);

  // Function to fetch weather data by location (city/state/zip)
  const fetchWeather = useCallback(async (location) => {
    let query = location;

    // Detect if location is city, state
    if (location.includes(',')) {
      const [city, state] = location.split(',').map(s => s.trim());
      if (state.length > 2) {
        // Convert state full name to abbreviation if necessary
        query = `${city},${state}`;
      }
    }

    try {
      const response = await axios.get(
        `${WEATHER_API_ENDPOINT}?q=${query}&appid=${WEATHER_API_KEY}`
      );
      console.log('Weather API Response:', response.data);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.');
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      );
      console.log('Weather API Response:', response.data);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      setError('Failed to fetch weather data. Please try again later.');
    }
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOLOCATOR_API_KEY}`
        );
        const { lat, lng } = response.data.location;
        console.log('Geolocation API Response:', response.data);
        fetchWeatherByCoords(lat, lng);
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setError('Geolocation failed. Fetching weather for default city.');
        fetchWeather(defaultCity);
      }
    };

    fetchLocation();
  }, [defaultCity, fetchWeather, fetchWeatherByCoords]);

  const isDay = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  };

  return (
    <div className="container">
      <div className="header">
        <Logo />
      </div>
      <SearchBar onSearch={fetchWeather} />
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <>
          <Weather data={weatherData} isDay={isDay()} />
          <WeatherDetails details={weatherData.main} />
        </>
      )}
    </div>
  );
}

export default App;
