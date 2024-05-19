async function fetchAndUpdateWeather() {
  const apiKey = "eb75f4868fc0e21625990b43dc9074e1";
  const city = "Kharkiv";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const weatherData = await response.json();

  document.querySelector(".weather-header span:first-child").textContent =
    weatherData.name;
  document.querySelector(".weather-header span:last-child").textContent =
    new Date().toLocaleDateString();
  document.querySelector(".weather-info span").textContent = `${Math.round(
    weatherData.main.temp
  )}°`;
  document.querySelector(".detailed-info span").textContent = `${Math.round(
    weatherData.main.temp
  )}°`;
  document.querySelector(
    ".wind-speed span"
  ).textContent = `${weatherData.wind.speed.toFixed(1)} mph`;
  document.querySelector(
    ".wind-speed-stat span"
  ).textContent = `${weatherData.wind.speed.toFixed(1)} mph`;
  document.querySelector(
    ".humidity span"
  ).textContent = `${weatherData.main.humidity}%`;
  document.querySelector(
    ".humidity-stat span"
  ).textContent = `${weatherData.main.humidity}%`;
  document.querySelector(
    ".weather-status span"
  ).textContent = `${weatherData.weather[0].main}`;
  document.querySelector(
    ".detailed-status span"
  ).textContent = `${weatherData.weather[0].main}`;
  document.querySelector(
    ".feels-like span"
  ).textContent = `Feels like ${Math.round(weatherData.main.feels_like)}°`;
  updateWeatherCards();
}

function getDayName(dayIndex) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex];
}

async function updateWeatherCards() {
  const apiKey = "eb75f4868fc0e21625990b43dc9074e1";
  const city = "Kharkiv";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const forecastData = await response.json();
  const dailyForecasts = forecastData.list.filter((forecast) => {
    return forecast.dt_txt.endsWith("12:00:00");
  });

  const dayCards = document.querySelectorAll(".weather-cards .card");

  dayCards.forEach((card, index) => {
    const forecast = dailyForecasts[index];
    const date = new Date(forecast.dt * 1000);
    const dayName = getDayName(date.getDay());
    const temp = Math.round(forecast.main.temp);

    card.querySelector(".day").textContent = dayName;
    card.querySelector(".celsium").textContent = `${temp}°`;
    card.querySelector(".status").textContent = forecast.weather[0].main;
  });
}

fetchAndUpdateWeather();

function updateGreetingAndTime() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const timeContainer = document.querySelector(".time span");
  const greetingContainer = document.querySelector(".greetings span");

  timeContainer.textContent = currentTime.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (currentHour >= 5 && currentHour < 12) {
    greetingContainer.textContent = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingContainer.textContent = "Good Day";
  } else {
    greetingContainer.textContent = "Good Night";
  }
}

updateGreetingAndTime();
setInterval(updateGreetingAndTime, 60000);

async function updateDetailedCards() {
  const apiKey = "eb75f4868fc0e21625990b43dc9074e1";
  const city = "Kharkiv";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const forecastData = await response.json();
  const hourlyForecasts = forecastData.list.slice(0, 6);

  const detailedCards = document.querySelectorAll(".detailed-cards .hour-card");

  detailedCards.forEach((card, index) => {
    const forecast = hourlyForecasts[index];
    const time = new Date(forecast.dt * 1000);
    const hours = time.getHours();
    const temp = Math.round(forecast.main.temp);
    const status = forecast.weather[0].main;

    card.querySelector(".day").textContent = `${hours}:00`;
    card.querySelector(".celsium").textContent = `${temp}°`;
    card.querySelector(".status").textContent = status;
  });
}

updateDetailedCards();
