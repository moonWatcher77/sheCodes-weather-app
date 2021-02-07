let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[now.getDay()];

let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = "0" + currentHours;
}

let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = "0" + currentMinutes;
}

let h1 = document.querySelector("h1");
h1.innerHTML = `${currentDay}, ${currentHours} : ${currentMinutes}`;

function city(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control");
  let cityName = city.value;
  let apiKey = "c2e818d4b23bd63a46cf1f9a542a8c4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}




let cityForm = document.querySelector("#form-city");
cityForm.addEventListener("submit", city);



let myCity = document.querySelector("#button-current");
myCity.addEventListener("click", currentCity);

function showTemperature(response) {
  let city = document.querySelector(".form-control");
  city.value = " ";
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  let currentTemp = document.querySelector(".degreesMain");
  currentTemp.innerHTML = Math.round(response.data.main.temp) + "ºC";
}

function currentPosition(position){
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c2e818d4b23bd63a46cf1f9a542a8c4d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}



