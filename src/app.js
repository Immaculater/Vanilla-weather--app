function refreshWeather(response) {
  //console.log(response.data);

  let temperature = response.data.temperature.current;
  let weatherElement = document.querySelector("#weather-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon"); 
 
  weatherElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatedDate(date); //`${date.getDay()} ${date.getHours()} : ${date.getMinutes()} `;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-icon">`;
  getForecast(response.data.city);
}

function formatedDate(date) {
  let minuites = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minuites < 10) {
    minuites = `0${minuites}`;
  }
  return `${day} ${hours}:${minuites}, `;
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
  console.log(searchFormInput.value);

  search(searchFormInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast (city) {
let apiKey = "1ea13fb3c286o84864f57t06508d1bba";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

function displayForecast (response) {
  let forecastHtml = "";

 response.data.daily.forEach(function (day, index) {
  if (index < 5) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}"class="weather-forecast-icon">
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temp">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weather-forecast-temp">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
          </div>
`;
  }
  });
let forecast = document.querySelector("#weather-forecast");
forecast.innerHTML = forecastHtml;
};

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);



search("Jos");


