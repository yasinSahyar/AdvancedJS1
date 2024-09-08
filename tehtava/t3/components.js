'use strict';

// Function to create a table row for each restaurant
const restaurantRow = ({ name, company, address }) => {
  const rivi = document.createElement('tr');

  // Destructure and assign values in table cells
  const nimi = document.createElement('td');
  nimi.innerText = name ?? 'N/A';  // Fallback to 'N/A' if name is undefined or null

  const firma = document.createElement('td');
  firma.innerText = company ?? 'N/A';

  const osoite = document.createElement('td');
  osoite.innerText = address ?? 'N/A';

  rivi.append(nimi, firma, osoite);
  return rivi;
};

// Function to create a modal with restaurant info and the menu
const restaurantModal = ({ name, company, address, city, phone, postalCode }, menu) => {
  // Use destructuring in the map function to get menu details
  let listaHTML = menu.map(({ name: courseName = 'ei ilmoitettu', price = 'ei ilmoitettu', diets = 'ei ilmoitettu' }) => `
    <li>
      <h4>${courseName}</h4>
      <p>Hinta: ${price}</p>
      <p>Allergeenit: ${diets}</p>
    </li>
  `).join('');

  // Use destructuring to directly use restaurant info
  return `
    <header>
      <h3>${name ?? 'N/A'}</h3>
      <p>${company ?? 'N/A'}</p>
    </header>
    <address>
      ${address ?? 'N/A'}<br>
      ${postalCode ?? ''} ${city ?? ''}<br>
      ${phone ?? 'N/A'}<br>
    </address>
    <div>
      <h3>Päivän ruokalista</h3>
      <ul>
        ${listaHTML}
      </ul>
    </div>
  `;
};

export { restaurantRow, restaurantModal };
