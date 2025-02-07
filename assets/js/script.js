const weatherApiKey = '527500044061a7b54b4b393e518ead43'; // OpenWeather API key

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;
  if (city) {
    getWeatherData(city);
  }
});

// Event listener for the search history list
document.getElementById('search-history').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    getWeatherData(e.target.textContent);
  }
});

// Function to fetch and display the current weather data for a city
function getWeatherData(city) {
  const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weatherApiKey}`;
  
  fetch(geocodeUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found in geocode');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('City not found in geocode');
      }
      const { lat, lon } = data[0];
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found in weather data');
      }
      return response.json();
    })
    .then(data => {
      const { name, main, wind, weather } = data;

      // Update the HTML elements with the weather data
      document.getElementById('city-name').textContent = name;
      document.getElementById('current-date').textContent = new Date().toLocaleDateString();
      document.getElementById('temperature').textContent = `${main.temp}°F`;
      document.getElementById('wind').textContent = `${wind.speed} MPH`;
      document.getElementById('humidity').textContent = `${main.humidity}%`;
      document.getElementById('weather-icon').textContent = weather[0].description;

      // Fetch and display the 5-day forecast for the city
      getForecastData(data.coord.lat, data.coord.lon);

      // Save the city to the search history
      saveToSearchHistory(city);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('City not found. Please enter a valid city.');
    });
}

// Function to fetch and display the 5-day weather forecast for a city
function getForecastData(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching forecast data');
      }
      return response.json();
    })
    .then(data => {
      const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
      const forecastCards = document.getElementById('forecast-cards');
      forecastCards.innerHTML = '';

      forecast.forEach(day => {
        const card = document.createElement('div');
        card.classList.add('forecast-card');
        card.innerHTML = `
          <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
          <p>${day.weather[0].description}</p>
          <p>${day.main.temp}°F</p>
          <p>${day.wind.speed} MPH</p>
          <p>${day.main.humidity}%</p>
        `;
        forecastCards.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching forecast data:', error));
}

// Function to save the searched city to localStorage and update the search history display
function saveToSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    displaySearchHistory();
  }
}

// Function to display the search history from localStorage
function displaySearchHistory() {
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const searchHistoryEl = document.getElementById('search-history');
  searchHistoryEl.innerHTML = '';

  searchHistory.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    searchHistoryEl.appendChild(li);
  });
}

// Call displaySearchHistory on window load to display the search history when the page loads
window.onload = displaySearchHistory;
