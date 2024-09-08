'use strict';
import { restaurantRow, restaurantModal } from './components.js';
import { fetchData } from './fetchData.js';
import { apiURL } from './variables.js';

const tbody = document.querySelector('tbody');
const modal = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');
const sodexoBTN = document.querySelector('#sodexo');
const compassBTN = document.querySelector('#compass');
const resetBTN = document.querySelector('#reset');

// Close modal logic
closeModal.addEventListener('click', () => {
  modal.close();
});

// Fetch restaurant data from API
const fetchRestaurants = async () => {
  return await fetchData(`${apiURL}/api/v1/restaurants`);
};

// Function to populate the restaurant list in the table
const populateRestaurantList = async (restaurants) => {
  tbody.innerHTML = '';

  // Filter for Sodexo restaurants on button click
  sodexoBTN.addEventListener('click', () => {
    const filteredRestaurants = restaurants.filter(({ company }) => company === 'Sodexo');
    populateRestaurantList(filteredRestaurants);
  });

  // Sort restaurants alphabetically by name
  restaurants.sort(({ name: a }, { name: b }) => a.localeCompare(b));

  // Render each restaurant row and attach click event for modal
  restaurants.forEach((restaurant) => {
    if (restaurant) {
      const { _id } = restaurant;

      // Generate the row using the restaurantRow function
      const row = restaurantRow(restaurant);

      // Add event listener to display modal when a row is clicked
      row.addEventListener('click', async () => {
        modal.showModal();
        info.innerHTML = '<div>Loading...</div>';

        // Fetch the daily menu for the clicked restaurant
        const menuData = await fetchData(`${apiURL}/api/v1/restaurants/daily/${_id}/fi`);

        // Use the restaurantModal function to generate modal content
        info.innerHTML = restaurantModal(restaurant, menuData.courses ?? []);
      });

      tbody.appendChild(row);
    }
  });
};

// Initialize the app by fetching and displaying restaurants
const restaurants = await fetchRestaurants();
populateRestaurantList(restaurants);
