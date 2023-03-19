import "./css/styles.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { fetchCountries } from "fetchCountries.js";

const countryList = document.querySelector(".country-list");

const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

const inputBox = document.querySelector("input");

inputBox.addEventListener(
  "input",
  debounce(async () => {
    const inputValue = inputBox.value.trim();
    const countries = await fetchCountries(inputValue);

    countryList.innerHTML = "";
    countryInfo.innerHTML = "";

    countries.forEach((country) => {
      const li = document.createElement("li");
      li.textContent = country.name.common;
      countryList.appendChild(li);

      li.addEventListener("click", () => {
        // display country info
        const info = document.createElement("div");
        info.innerHTML = `
      <h2>${country.name.common}</h2>
      <img src="${country.flags.svg}" alt="${country.name.common} flag">
      <ul>
        <li>Capital: ${country.capital}</li>
        <li>Population: ${country.population}</li>
        <li>Languages: ${Object.values(country.languages).join(", ")}</li>
      </ul>`;
        countryInfo.innerHTML = "";
        countryInfo.appendChild(info);
      });
    });
  }, DEBOUNCE_DELAY)
);
