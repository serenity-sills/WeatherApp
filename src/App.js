import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import Logo from './components/Logo'; // Import the Logo component
import './App.css';

const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const WEATHER_API_ENDPOINT = process.env.REACT_APP_WEATHER_API_ENDPOINT;
const GEOLOCATOR_API_KEY = process.env.REACT_APP_GEOLOCATOR_API_KEY;
const DEFAULT_CITY = 'New York, US';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_ENDPOINT}?q=${city}&appid=${WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
    }
  };

  const fetchLocation = useCallback(async () => {
    try {
      const response = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOLOCATOR_API_KEY}`
      );
      const { lat, lng } = response.data.location;
      fetchWeatherByCoords(lat, lng);
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      // Fallback to default city if geolocation fails
      fetchWeather(DEFAULT_CITY);
    }
  }, [GEOLOCATOR_API_KEY, fetchWeatherByCoords, fetchWeather]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLocation(); // Fetch weather data based on user's location on initial load
    };

    fetchData();
  }, [fetchLocation]); // Only re-run effect if fetchLocation changes

  const isDay = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18; // Assuming day is between 6 AM to 6 PM
  };

  return (
    <div className="container">
      <div className="header">
        <Logo /> {/* Include the Logo component */}
      </div>
      <SearchBar onSearch={fetchWeather} /> {/* Add the SearchBar component */}
      {weatherData && <Weather data={weatherData} isDay={isDay()} />}
    </div>
  );
}

export default App;


