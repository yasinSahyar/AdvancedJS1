// utils.js
'use strict';

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('HTTP error: ' + response.status);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null; // Return null if fetching fails
  }
};

export { fetchData };
