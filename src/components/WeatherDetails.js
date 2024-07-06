import React from 'react';
import getWeatherIcon from './getWeatherIcon';

const WeatherDetails = ({ details }) => {
  if (!details || !details.weather || details.weather.length === 0) {
    return null; // Return nothing if details are not available
  }

  // Calculate temperature in Fahrenheit from Kelvin
  const tempInFahrenheit = ((details.temp - 273.15) * 9/5 + 32).toFixed(2);
  const weatherCondition = details.weather[0].main; // Get main weather condition
  const weatherIcon = getWeatherIcon(weatherCondition); // Get corresponding weather icon

  // This shows the weather details on the screen
  return (
    <div className="weather-details">
      <img src={`./icons/${weatherIcon}`} alt={weatherCondition} className="weather-icon" />
      <p className="temperature">Temperature: {tempInFahrenheit}°F</p>
      <p>Humidity: {details.humidity}%</p>
      <p>Pressure: {details.pressure} hPa</p>
    </div>
  );
}

export default WeatherDetails;
