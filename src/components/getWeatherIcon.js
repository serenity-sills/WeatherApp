// src/getWeatherIcon.js

const weatherIcons = {
  Clear: {
    day: '01d.png',
    night: '01n.png',
  },
  Clouds: {
    day: '03d.png',
    night: '03n.png',
  },
  Rain: {
    day: '09d.png',
    night: '09n.png',
  },
  Drizzle: {
    day: '10d.png',
    night: '10n.png',
  },
  Thunderstorm: {
    day: '11d.png',
    night: '11n.png',
  },
  Snow: {
    day: '13d.png',
    night: '13n.png',
  },
  Mist: {
    day: '50d.png',
    night: '50n.png',
  },
};

export default function getWeatherIcon(condition, isDay = true) {
  const iconSet = weatherIcons[condition];
  if (!iconSet) {
    return '01d.png'; // default to clear day if no match
  }
  return isDay ? iconSet.day : iconSet.night;
}

  