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
                });
            } else {
                alert('Error: City Not Found');
            }
        })
        .catch(function(error) {
            alert('Unable to connect: The weatherman is off duty!');
    });
};

searchFormEl.addEventListener('submit', formSubmitHandler);