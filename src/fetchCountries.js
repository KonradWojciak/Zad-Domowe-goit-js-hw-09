async function fetchCountries(value) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`
  );

  return response.json();
}

export { fetchCountries };
