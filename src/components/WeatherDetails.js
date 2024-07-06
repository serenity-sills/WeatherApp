import React from 'react';
import getWeatherIcon from './getWeatherIcon';

const WeatherDetails = ({ details }) => {
  const tempInFahrenheit = ((details.temp - 273.15) * 9/5 + 32).toFixed(2);
  const weatherCondition = details.weather[0].main;
  const weatherIcon = getWeatherIcon(weatherCondition);

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





