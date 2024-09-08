//components.js
'use strict';


// Function to create a table row for each restaurant
const restaurantRow = ({ name, company, address }) => {
  const rivi = document.createElement('tr');

  const nimi = document.createElement('td');
  nimi.innerText = name ?? 'N/A';  // Use nullish coalescing to provide a fallback if the name is missing

  const firma = document.createElement('td');
  firma.innerText = company ?? 'N/A';

  const osoite = document.createElement('td');
  osoite.innerText = address ?? 'N/A';

  rivi.append(nimi, firma, osoite);
  return rivi;
};

// Function to create a modal with restaurant info and the menu
const restaurantModal = ({ name, company, address, city, phone, postalCode }, menu) => {
  let listaHTML = menu.map(({ name: courseName, price, diets }) => `
    <li>
      <h4>${courseName ?? 'ei ilmoitettu'}</h4>  <!-- Use nullish coalescing for course name fallback -->
      <p>Hinta: ${price ?? 'ei ilmoitettu'}</p>  <!-- Use nullish coalescing for price fallback -->
      <p>Allergeenit: ${diets ?? 'ei ilmoitettu'}</p>  <!-- Use nullish coalescing for diets fallback -->
    </li>
  `).join('');

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
