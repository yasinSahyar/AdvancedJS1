//t1.js
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

// Fetch restaurants from the API
const haeRavintolat = async () => {
  try {
    return await fetchData(`${apiURL}/api/v1/restaurants`);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

// Function to generate and display the restaurant list
const teeRavintolaLista = (restaurants) => {
  kohde.innerHTML = '';

  // Sort restaurants alphabetically by name
  const sortedRestaurants = restaurants.sort((a, b) => a.name?.localeCompare(b.name) ?? 0);

  // Create table rows using map and append them to the table
  sortedRestaurants.map((restaurant) => {
    if (restaurant) {
      const rivi = restaurantRow(restaurant);

      rivi.addEventListener('click', async () => {
        modaali.showModal();
        info.innerHTML = '<div>Ladataa...</div>';

        // Remove highlight from previously selected rows
        document.querySelectorAll('.highlight').forEach((korostettu) => korostettu.classList.remove('highlight'));

        // Highlight the selected row
        rivi.classList.add('highlight');

        // Fetch daily menu
        try {
          const paivanLista = await fetchData(`${apiURL}/api/v1/restaurants/daily/${restaurant._id}/fi`);
          const ravintolaHTML = restaurantModal(restaurant, paivanLista?.courses ?? []);
          info.innerHTML = ravintolaHTML;
        } catch (error) {
          console.error('Error fetching daily menu:', error);
          info.innerHTML = '<div>Error loading menu</div>';
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

// Initialize the restaurant list and setup filters
const initializeApp = async () => {
  const restaurants = await haeRavintolat();
  if (!restaurants || restaurants.length === 0) {
    console.log('No restaurants found'); // Debugging
    return;
  }

  filterAndDisplayRestaurants(restaurants, 'all');

  // Event listeners for filtering
  sodexoBTN.addEventListener('click', () => filterAndDisplayRestaurants(restaurants, 'Sodexo'));
  compassBTN.addEventListener('click', () => filterAndDisplayRestaurants(restaurants, 'Compass'));
  resetBTN.addEventListener('click', () => filterAndDisplayRestaurants(restaurants, 'all'));
};

// Start the application
initializeApp();
