var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city-input');
var resultsContainerEl = document.querySelector('#results');

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter the name of a city');
    }
};

var getCityWeather = function(city) {
    var apiKey = '0ea17125ef15498e647e96299b01656d';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    displayWeather(data);
                });
            } else {
                alert('Error: City Not Found');
            }
        })
        .catch(function(error) {
            alert('Unable to connect: The weatherman is off duty!');
    });
};

var displayWeather = function(weather) {
    // First, clear previous results
    resultsContainerEl.textContent = '';
    
    // Create a container for current weather
    var currentWeatherEl = document.createElement('article');
    currentWeatherEl.classList = 'p-10';

    // Create h2 with name & date
    var h2El = document.createElement('h2');
    h2El.id = 'city-name';
    h2El.classList = 'display-inline';
    var cityName = weather.name;
    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + 
        today.getDate() + '/' + 
        today.getFullYear();
    var icon = weather.weather[0].icon;

    // Create weather icon to the right of h2
    var imgEl = document.createElement('img')
    imgEl.classList = 'absolute-position';
    imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + icon + '.png')
    h2El.textContent = cityName + ' (' + date + ')  ';

    

    // append elements to current weather section
    currentWeatherEl.appendChild(h2El);
    currentWeatherEl.appendChild(imgEl);

    // append current weather section to results div
    resultsContainerEl.appendChild(currentWeatherEl);
}

searchFormEl.addEventListener('submit', formSubmitHandler);