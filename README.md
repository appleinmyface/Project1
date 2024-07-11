# Weather Dashboard

## Overview
The Weather Dashboard is a web application that allows users to search for current weather and a 5-day forecast for any city. The application uses the OpenWeather API to fetch weather data and displays it in a user-friendly format. Additionally, the application maintains a search history, allowing users to quickly revisit previously searched cities.

## Features

### Current Weather: 
 Displays the current temperature, wind speed, humidity, and weather description for the searched city.
### 5-Day Forecast: 
Provides a 5-day weather forecast, including temperature, wind speed, humidity, and weather description for each day.
### Search History: 
Keeps a record of previously searched cities, allowing users to quickly access weather data for those cities again.

## Usage
Enter a City: Type the name of the city you want to search for in the input field and click the "Search" button.
View Weather Data: The current weather and 5-day forecast for the city will be displayed.
Search History: Click on any city name in the search history to view the weather data for that city again.

## Difficulties Encountered

During the development of the Weather Dashboard, several challenges were faced:

API Integration: Initially, there was confusion about how to properly integrate and use the OpenWeather API, especially distinguishing between the geocoding API and the weather/forecast APIs.

Error Handling: Handling errors gracefully was challenging. Ensuring that users received meaningful error messages when cities were not found or when there were issues with API requests required careful coding and testing.

Data Synchronization: Synchronizing the current weather data with the forecast data and ensuring they matched accurately involved understanding the data structure returned by the APIs.

LocalStorage Management: Implementing a reliable search history feature using localStorage required ensuring data consistency and managing the display updates efficiently.

## Technologies Used
HTML
CSS
JavaScript
OpenWeather API
Getting Started

## Future Enhancements
Add error handling for network errors.
Enhance the UI/UX with better design and animations.
Add more weather details such as UV index, sunrise/sunset times, etc.
Implement additional features like saving favorite cities, weather alerts, etc.

## Acknowledgments
**OpenWeather** for providing the weather data API.
