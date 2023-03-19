import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from 'fetchCountries.js';

const countryList = document.querySelector('.country-list');

const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const inputBox = document.querySelector('input');


async function  makeCountryList(){
  const li = document.createElement('li');
  li.innerHTML = `
<img src="${country.flags.svg}" alt="${country.name.official} flag">
<span>${country.name.official}</span>
`;
  countryList.appendChild(li);
}

function makeCountryInfo(){
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
    const countries = await fetchCountries(inputValue);

    for (const country of countries) {
      const countryName = country.name.official.toLowerCase();

      if (inputValue.includes(countryName)) {
      makeCountryList(country)
      }

      else if (countryName === inputValue) {

      makeCountryInfo(countries)
    }
  },
  
  DEBOUNCE_DELAY)
);


fetchCountries(inputValue)
.then (countries => {
  if (countries.length>10){
    Notify.info(
      "To many matches found. Please enter more specific name")
  }
  else if (countries.length>1){
    makeCountryList(countries);
  }
  else if (countries.length===1){
    makecountryInfo(countries[0])
  }
  else {
    Notify.failure(
      "Oops, there is no country with that name"
    )
  }

})

}
