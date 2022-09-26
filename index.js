//let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}&units=metric`;
let apiKey = `4975693074f5bfc65abc22e434e38a07`;
let btn = document.querySelector("#searchBtn");
const viewForcast = (response) => {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let date = new Date();
  let curDate = weekDays[date.getDay()];
  let minut = date.getMinutes();
  if (minut < 10) {
    minut = `0${date.getMinutes()}`;
  }
  let time = `${curDate} ${date.getHours()}:${minut} minutes`;
  document.querySelector("#time").innerHTML = time;

  document.querySelector("#forecast").innerHTML = response.data.weather[0].main;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind: ${wind} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#curTemp").innerHTML = Math.round(
    response.data.main.temp
  );
};
btn.addEventListener("click", (event) => {
  let city = document.querySelector("#SearchInput").value;
  console.log(city);
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(viewForcast);
});

let curBtn = document.querySelector("#currentBtn");
curBtn.addEventListener("click", (event) => {
  let lat, lon;

  function handlePosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    let urlCurWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(urlCurWeather);
    axios.get(urlCurWeather).then(viewForcast);
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
});
