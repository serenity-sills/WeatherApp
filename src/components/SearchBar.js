import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // Keeps track of what the user is searching

  // Function to handle search submission
  const handleSearch = (event) => {
    event.preventDefault(); // Stops the form from submitting in its usual way
    if (query.trim()) {
      onSearch(query.trim()); // Sends the cleaned-up search term to the parent component's search function
      setQuery(''); // Clear the input field after search
    }
  };

  // This shows the search bar where users can input a location
  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Enter city, state, or zip code"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
