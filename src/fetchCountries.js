async function fetchCountries(name) {
  const inputValue = inputBox.value.trim();
  const url = `https://restcountries.com/v3.1/all`;
  const searchParams = {
    param1: '_name.official',
    param2: '_capital',
    param3: '_population',
    param4: '_flags.svg',
    param5: '_languages',
  };

  const queryParams = new URLSearchParams(searchParams);
  const stringParams = queryParams.toString();
  const urlWithParams = `${url}?${stringParams}`;

  const countries = await fetch(urlWithParams);

  return countries.catch(error => console.log(error));
}

export { fetchCountries };
