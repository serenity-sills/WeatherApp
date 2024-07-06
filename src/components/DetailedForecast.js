import React from 'react';
import getWeatherIcon from './getWeatherIcon';

const DetailedForecast = ({ data }) => {
  // Check if weather data is not available
  if (!data) {
    return <p>No weather data available</p>; // Display message if data is missing
  }

  // Pick out key details from the data
  const { main, weather, wind, name } = data;

   // Calculate temperature in Fahrenheit from Kelvin
  const tempInFahrenheit = ((main.temp - 273.15) * 9/5 + 32).toFixed(2);

   // Calculate temperature in Fahrenheit from Kelvin
  const weatherCondition = weather[0].main;
  const weatherIcon = getWeatherIcon(weatherCondition);

  // This is how we show detailed weather information on the screen
  return (
    <div className="detailed-forecast">
      <h1>{name}</h1>
      <img src={`./icons/${weatherIcon}`} alt={weatherCondition} className="weather-icon" />
      <p>Description: {weather[0].description}</p>
      <p className="temperature">Temperature: {tempInFahrenheit}°F</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Pressure: {main.pressure} hPa</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
}

export default DetailedForecast;


