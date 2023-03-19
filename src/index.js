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

for (const country of countries) {
  const countryName = country.name.official.toLowerCase();
  
  if (inputValue.includes(countryName)) {
    const li = document.createElement('li');
    li.textContent = country.name.official;
    countryList.appendChild(li);
  }
  else if 
}
});

    const countries = await fetchCountries(inputValue);

    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    countries.forEach(country => {
      const li = document.createElement('li');
      li.textContent = country.name.official;
      countryList.appendChild(li);

      const info = document.createElement('div');
      info.innerHTML = `
      <h2>${country.name.official}</h2>
      <img src="${country.flags.svg}" alt="${country.name.official} flag">
      <ul>
        <li>Capital: ${country.capital}</li>
        <li>Population: ${country.population}</li>
        <li>Languages: ${Object.values(country.languages).join(', ')}</li>
      </ul>`;
      countryInfo.innerHTML = '';
      countryInfo.appendChild(info);
    });
  }, DEBOUNCE_DELAY)
);
