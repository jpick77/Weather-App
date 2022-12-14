

function getWeather(query) {
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=97ffa5948fec702405313e29d2ecf5d9";

    fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));

}

getWeather();