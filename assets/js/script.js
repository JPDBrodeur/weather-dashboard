var searchFormEl = document.querySelector('#search-form');
var cityInputEl = document.querySelector('#city-input');
var resultsContainerEl = document.querySelector('#results');

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getLatLon(city);
        cityInputEl.value = '';
    } else {
        alert('Please enter the name of a city');
    }
};

var getLatLon = function(city) {
    var apiKey = '0ea17125ef15498e647e96299b01656d';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var city = data.name;
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    getWeather(lat, lon, city);
                });
            } else {
                alert('Error: City Not Found');
            }
        })
        .catch(function(error) {
            alert('Unable to connect: The weatherman is off duty!');
    });
};

var getWeather = function(lat, lon, city) {
    var apiKey = '0ea17125ef15498e647e96299b01656d';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(data) {
                var current = data.current;
                var daily = data.daily;
                displayCurrentWeather(current, city)
                displayForecast(daily);
                });
    });
};

var displayCurrentWeather = function(data, city) {
    console.log(data);
    // First, clear previous results
    resultsContainerEl.textContent = '';
    
    // Create a container for current weather
    var currentWeatherEl = document.createElement('article');
    currentWeatherEl.classList = 'p-10';

    // Create h2 with name & date
    var h2El = document.createElement('h2');
    h2El.id = 'city-name';
    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + 
        today.getDate() + '/' + 
        today.getFullYear();
    var icon = data.weather[0].icon;

    // Create weather icon to the right of h2
    var imgEl = document.createElement('img')
    imgEl.classList = 'absolute-position';
    imgEl.setAttribute('src', 'http://openweathermap.org/img/w/' + icon + '.png')
    h2El.textContent = city + ' (' + date + ')  ';

    // Create paragraphs for temperature, wind, humidity & uvi
    var tempEl = document.createElement('p')
    tempEl.innerHTML = 'Temp: ' + data.temp + '<span>&#176;</span>F';
    tempEl.classList = 'p-20-0-10-0';

    var windEl = document.createElement('p')
    windEl.textContent = 'Wind: ' + data.wind_speed + ' MPH';
    windEl.classList = 'p-10-0';

    var humidityEl = document.createElement('p')
    humidityEl.textContent = 'Humidity: ' + data.humidity + ' %';
    humidityEl.classList = 'p-10-0';

    var uvIndexEl = document.createElement('p')
    uvIndexEl.innerHTML = "UV Index: <span id='uvi'>" + data.uvi + '</span>';
    uvIndexEl.classList = 'p-10-0';

    // Append elements to current weather section
    currentWeatherEl.appendChild(h2El);
    currentWeatherEl.appendChild(imgEl);
    currentWeatherEl.appendChild(tempEl);
    currentWeatherEl.appendChild(windEl);
    currentWeatherEl.appendChild(humidityEl);
    currentWeatherEl.appendChild(uvIndexEl);

    // Append current weather section to results div
    resultsContainerEl.appendChild(currentWeatherEl);

    // Dynamically update color to reflect severity of the UV Index
    var uviColorEl = document.querySelector('#uvi');
    if (parseInt(data.uvi) < 3) {
        uviColorEl.classList = 'favorable';
    } else if (parseInt(data.uvi) > 8) {
        uviColorEl.classList = 'severe';
    } else {
        uviColorEl.classList = 'moderate';
    }
}

searchFormEl.addEventListener('submit', formSubmitHandler);