'use strict';

// Function to create a table row for each restaurant
const restaurantRow = ({ name, company, address }) => {
  const rivi = document.createElement('tr');

  const nimi = document.createElement('td');
  nimi.innerText = name;

  const firma = document.createElement('td');
  firma.innerText = company;

  const osoite = document.createElement('td');
  osoite.innerText = address;

  rivi.append(nimi, firma, osoite);
  return rivi;
};

// Function to create a modal with restaurant info and the menu
const restaurantModal = ({ name, company, address, city, phone, postalCode }, menu) => {
  let listaHTML = menu.map(({ name: courseName = 'ei ilmoitettu', price = 'ei ilmoitettu', diets = 'ei ilmoitettu' }) => `
    <li>
      <h4>${courseName}</h4>
      <p>Hinta: ${price}</p>
      <p>Allergeenit: ${diets}</p>
    </li>
  `).join('');

  return `
    <header>
      <h3>${name}</h3>
      <p>${company}</p>
    </header>
    <address>
      ${address}<br>
      ${postalCode} ${city}<br>
      ${phone}<br>
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

