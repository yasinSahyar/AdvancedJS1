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
const haeRavintolat = async () => await fetchData(`${apiURL}/api/v1/restaurants`);

// Function to generate and display the restaurant list
const teeRavintolaLista = async (restaurants) => {
  kohde.innerHTML = '';

  // Filter for Sodexo restaurants
  sodexoBTN.addEventListener('click', () => {
    const filteredRestaurants = restaurants.filter(({ company }) => company === 'Sodexo');
    teeRavintolaLista(filteredRestaurants);
  });

  // Sort restaurants alphabetically by name
  restaurants.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB));

  restaurants.forEach((restaurant) => {
    if (restaurant) {
      const { _id } = restaurant;

      // Generate HTML row for each restaurant
      const rivi = restaurantRow(restaurant);

      rivi.addEventListener('click', async () => {
        modaali.showModal();
        info.innerHTML = '<div>Ladataa...</div>';

        // Remove highlight from previously selected rows
        document.querySelectorAll('.highlight').forEach((korostettu) => korostettu.classList.remove('highlight'));

        // Highlight the selected row
        rivi.classList.add('highlight');

        // Fetch daily menu
        const paivanLista = await fetchData(`${apiURL}/api/v1/restaurants/daily/${_id}/fi`);

        console.log('päivan lista', paivanLista.courses);

        // Display the restaurant info and daily menu in the modal
        const ravintolaHTML = restaurantModal(restaurant, paivanLista.courses);
        info.innerHTML = ravintolaHTML;
      });

      kohde.append(rivi);
    }
  });
};

// Initialize the restaurant list
const raflat = await haeRavintolat();
teeRavintolaLista(raflat);

