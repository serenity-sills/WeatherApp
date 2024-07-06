import React from 'react';
import getWeatherIcon from './getWeatherIcon';

const DetailedForecast = ({ data }) => {
  if (!data) {
    return <p>No weather data available</p>;
  }

  const { main, weather, wind, name } = data;
  const tempInFahrenheit = ((main.temp - 273.15) * 9/5 + 32).toFixed(2);
  const weatherCondition = weather[0].main;
  const weatherIcon = getWeatherIcon(weatherCondition);

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


