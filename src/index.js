import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from 'fetchCountries.js';

const countryList = document.querySelector('.country-list');

const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const inputBox = document.querySelector('input');

inputBox.addEventListener(
  'input',
  debounce(async () => {

const inputValue = inputBox.value.trim()

countryList.innerHTML = '';
countryInfo.innerHTML = '';
const countries = await fetchCountries(inputValue);

for (const country of countries) {
  const countryName = country.name.official.toLowerCase();
  
  if (inputValue.includes(countryName)) {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.official} flag">
      <span>${country.name.official}</span>
    `;
    countryList.appendChild(li);
  }

  if (countryName === inputValue){

  const info = document.createElement('div');
  info.innerHTML = `
  <h2>${country.name.official}</h2>
  <img src="${country.flags.svg}" alt="${country.name.official} flag">
  <ul>
    <li>Capital: ${country.capital}</li>
    <li>Population: ${country.population}</li>
    <li>Languages: ${Object.values(country.languages).join(', ')}</li>
  </ul>`;
  countryInfo.appendChild(info);
}

if 
}
}, DEBOUNCE_DELAY)
);

