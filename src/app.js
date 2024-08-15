function refreshWeather(response) {
  console.log(response.data);

  let temperature = response.data.temperature.current;
  let weatherElement = document.querySelector("#weather-temperature");
  weatherElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function search(city) {
  let apiKey = "1ea13fb3c286o84864f57t06508d1bba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  //console.log(searchFormInput.value);

  search(searchFormInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

search("Jos");
