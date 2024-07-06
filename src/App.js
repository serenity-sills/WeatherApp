import React, { useState, useEffect } from 'react';
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

 // State variables for weather data, error handling, and default city
function App() {
  // State for weather data from API
  const [weatherData, setWeatherData] = useState(null);
  // State for error messages
  const [error, setError] = useState(null);
  // State for default city
  const [defaultCity, setDefaultCity] = useState(DEFAULT_CITY);

   // Function to fetch weather data by city name
  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_ENDPOINT}?q=${city}&appid=${WEATHER_API_KEY}`
      );
      console.log('Weather API Response:', response.data); // Log the response
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.'); // Set error message
    }
  };
  
  // Function to fetch weather data by coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `${WEATHER_API_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
      );
      console.log('Weather API Response:', response.data); // Log the response
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
      setError('Failed to fetch weather data. Please try again later.'); // Set error message
    }
  };

  // UseEffect hook to automatically get the user's location and weather data when the app first loads or when the default city changes
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.post(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEOLOCATOR_API_KEY}`
        );
        const { lat, lng } = response.data.location;
        console.log('Geolocation API Response:', response.data); // Log the response
        fetchWeatherByCoords(lat, lng);
      } catch (error) {
        console.error('Error fetching geolocation:', error);
        setError('Geolocation failed. Fetching weather for default city.'); // Set error message
        fetchWeather(defaultCity); // Fetch weather for default city on error
      }
    };

    fetchLocation();

  }, [defaultCity]); // Include defaultCity in dependencies to ensure it updates when defaultCity changes

  // Function to determine if it is day or night based on current time
  const isDay = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18;
  };

  // This is the content that the App component displays on the screen
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

