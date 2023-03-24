import debounce from 'lodash.debounce';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const countryInfo = document.querySelector('.country-info');
const inputBox = document.querySelector('input');
const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');

async function makeCountryList(countries) {
  countries.forEach(country => {
    const li = document.createElement('li');
    li.innerHTML = `
<img src="${country.flags.svg}" alt="${country.name.official} flag">
<span style="font-weight: bold;">${country.name.official}</span>
`;
    countryList.appendChild(li);
  });
}

async function makeCountryInfo(country) {
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

inputBox.addEventListener(
  'input',
  debounce(async () => {
    const inputValue = inputBox.value.trim();

    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    fetchCountries(inputValue).then(countries => {
      if (countries.length > 10) {
        Notify.info('To many matches found. Please enter more specific name');
      } else if (countries.length > 1) {
        makeCountryList(countries);
      } else if (countries.length === 1) {
        makeCountryInfo(countries[0]);
      } else {
        Notify.failure('Oops, there is no country with that name');
      }
    });
  }, DEBOUNCE_DELAY)
);
