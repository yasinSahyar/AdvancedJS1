//fetchData.js
'use strict';

// Function to fetch data from the provided URL
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return await response.json();
};

export { fetchData };
