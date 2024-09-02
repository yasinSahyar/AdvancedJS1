'use strict';
import {fetchData} from './fetchData.js';

const kohde = document.querySelector('tbody');
const modaali = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => {
  modaali.close();
});

const apiURL = 'https://media1.edu.metropolia.fi/restaurant';

const teeRavintolaLista = async () => {
  const restaurants = await fetchData(apiURL + '/api/v1/restaurants');

  // your code here
  console.log(restaurants);
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  console.log(restaurants);

  for (const restaurant of restaurants) {
    if (restaurant) {
      const {name, address, _id, company, city, phone, postalCode} = restaurant;

      const nimi = document.createElement('td');
      nimi.innerText = name;

      const osoite = document.createElement('td');
      osoite.innerText = address;

      const rivi = document.createElement('tr');

      rivi.addEventListener('click', async () => {
        // hae päivän ruokalista
        const paivanLista = await fetchData(
          apiURL + `/api/v1/restaurants/daily/${_id}/fi`
        );

        console.log('päivan lista', paivanLista);
        // rakenna listan HTML (muista for lause)
        let listaHTML = '';
        for (const course of paivanLista.courses) {
          const {name, price, diets} = course;
          listaHTML += `
          <li>
            <h4>${name || 'ei ilmoitettu'}</h4>
            <p>Hinta: ${price || 'ei ilmoitettu '}</p>
            <p>Allergeenit: ${diets || 'ei ilmoitettu'}</p>
          </li>
          `;
        }

        const korostetut = document.querySelectorAll('.highlight');
        for (const korostettu of korostetut) {
          korostettu.classList.remove('highlight');
        }

        rivi.classList.add('highlight');
        modaali.showModal();
        const ravintolaHTML = `
          <header>
            <h3>${name}<h3>
            <p>${company}
            </p>
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
        info.innerHTML = '';
        info.insertAdjacentHTML('beforeend', ravintolaHTML);
      });

      rivi.append(nimi, osoite);
      kohde.append(rivi);
    }
  }
};

teeRavintolaLista();
