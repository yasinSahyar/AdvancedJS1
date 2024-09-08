// components.js
'use strict';

// Function to generate the table row for each restaurant
const restaurantRow = ({ name, company, address }) => {
  const row = document.createElement('tr');

  // Setting the table row content using destructuring
  row.innerHTML = `
    <td>${name ?? 'Unknown'}</td>
    <td>${company ?? 'Unknown'}</td>
    <td>${address ?? 'Unknown'}</td>
  `;

  return row;
};

// Function to generate the modal content with restaurant details and the menu
const restaurantModal = ({ name, address, postalCode, city, phone, company }, menu) => {
  let menuHtml = '<ul>';

  // Loop through the menu courses to generate the menu items
  menu.forEach(({ name: courseName = 'N/A', price = 'Not Available', diets = 'No info' }) => {
    menuHtml += `<li>${courseName}, ${price}. ${diets}</li>`;
  });

  menuHtml += '</ul>';

  // Create the modal content using destructuring
  return `
    <h1>${name ?? 'No Name'}</h1>
    <p>${address ?? 'No Address'}</p>
    <p>${postalCode ?? 'No Postal Code'}, ${city ?? 'No City'}</p>
    <p>${phone ?? 'No Phone'}</p>
    <p>${company ?? 'No Company'}</p>
    ${menuHtml}
  `;
};

// Export the functions to be used in other modules
export { restaurantRow, restaurantModal };
