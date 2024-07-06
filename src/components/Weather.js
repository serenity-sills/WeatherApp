import React from 'react';
import getWeatherIcon from './getWeatherIcon';

const Weather = ({ data, isDay }) => {
  // Check if weather data is not available yet
  if (!data) {
    return null; // Return nothing if data is not available
  }

  // Calculate temperature in Fahrenheit from Kelvin
  const tempInFahrenheit = ((data.main.temp - 273.15) * 9/5 + 32).toFixed(2);
  const weatherCondition = data.weather[0].main;
  const weatherIcon = getWeatherIcon(weatherCondition, isDay);

  // This shows the weather information in a card format
  return (
    <div className="weather-card">
      <h2>Weather in {data.name}</h2>
      <img src={`/icons/${weatherIcon}`} alt={weatherCondition} className="weather-icon" />
      <p className="temperature">Temperature: {tempInFahrenheit}°F</p>
      <p>Weather: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;





