// src/components/Logo.js

import React from 'react';

const Logo = () => (
  <div className="logo">
    <img src={`${process.env.PUBLIC_URL}/Logo/Weather App Logo.png`} alt="Weather App Logo" />
  </div>
);

export default Logo;
