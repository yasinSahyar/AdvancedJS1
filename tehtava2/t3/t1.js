'use strict';
import { restaurantModal, restaurantRow } from './components.js';
import { fetchData } from './fetchData.js';
import { apiURL } from './variables.js';

const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');
const sodexoBTN = document.querySelector('#sodexo');
const compassBTN = document.querySelector('#compass');
const resetBTN = document.querySelector('#reset');

// Close modal when clicking the close button
closeModal.addEventListener('click', () => modaali.close());

// Function to fetch restaurants from the API with error handling
const haeRavintolat = async () => {
  try {
    const data = await fetchData(`${apiURL}/api/v1/restaurants`);
    if (!data || data.length === 0) {
      throw new Error('No restaurants found.');
    }
    return data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    displayError('Failed to load restaurant data. Please try again later.');
    return [];
  }
};

// Function to generate and display the restaurant list
const teeRavintolaLista = (restaurants) => {
  kohde.innerHTML = '';

  if (restaurants.length === 0) {
    kohde.innerHTML = '<tr><td colspan="3">No restaurants available</td></tr>';
    return;
  }

  // Sort restaurants alphabetically by name
  const sortedRestaurants = restaurants.sort((a, b) => a.name?.localeCompare(b.name) ?? 0);

  // Create table rows using map and append them to the table
  sortedRestaurants.map(restaurant => {
    if (restaurant) {
      const rivi = restaurantRow(restaurant);

      rivi.addEventListener('click', async () => {
        modaali.showModal();
        info.innerHTML = '<div>Ladataa...</div>';

        // Remove highlight from previously selected rows
        document.querySelectorAll('.highlight').forEach(korostettu => korostettu.classList.remove('highlight'));

        // Highlight the selected row
        rivi.classList.add('highlight');

        // Fetch daily menu
        try {
          const paivanLista = await fetchData(`${apiURL}/api/v1/restaurants/daily/${restaurant._id}/fi`);
          const ravintolaHTML = restaurantModal(restaurant, paivanLista?.courses ?? []);
          info.innerHTML = ravintolaHTML;
        } catch (error) {
          console.error('Error fetching daily menu:', error);
          info.innerHTML = '<div>Error loading menu. Please try again later.</div>';
        }
      });

      kohde.append(rivi);
    }
  });
};

// Filter and display restaurants based on the selected company
const filterAndDisplayRestaurants = (restaurants, companyFilter) => {
  const filteredRestaurants = companyFilter === 'all'
    ? restaurants
    : restaurants.filter(({ company }) => company === companyFilter);
  teeRavintolaLista(filteredRestaurants);
};

// Display error messages
const displayError = (message) => {
  kohde.innerHTML = `<tr><td colspan="3">${message}</td></tr>`;
};

// Initialize the restaurant list and setup filters
const initializeApp = async () => {
  const restaurants = await haeRavintolat();
  if (!restaurants || restaurants.length === 0) {
    return; // Error already handled in haeRavintolat
  }

  // Display all restaurants initially
  filterAndDisplayRestaurants(restaurants, 'all');

  // Event listeners for filtering
  sodexoBTN.addEventListener('click', () => filterAndDisplayRestaurants(restaurants, 'Sodexo'));
  compassBTN.addEventListener('click', () => filterAndDisplayRestaurants(restaurants, 'Compass'));
  resetBTN.addEventListener('click', () => filterAndDisplayRestaurants(restaurants, 'all'));
};

// Start the application
initializeApp();
