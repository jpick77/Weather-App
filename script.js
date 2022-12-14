let submitButton = document.getElementById("submit");

function getWeather(query) {
    let name = document.getElementById("cityenter").value;
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=97ffa5948fec702405313e29d2ecf5d9`

    fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => displayCurrentWeather(data));

}

submitButton.addEventListener("click", getWeather);

function displayCurrentWeather(weather) {
    console.log(weather);
    let city = document.getElementById("cityName");
    city.textContent = weather.name;
    console.log(city);

    let temp = document.getElementById("currentTemp");
    temp.textContent = "Temp: " + weather.main.temp + " F";
    console.log(temp);

    let wind = document.getElementById("currentWind");
    wind.textContent = "Wind: " + weather.wind.speed + " mph, " + weather.wind.deg + " ° ";
    console.log(wind);

    let humidity = document.getElementById("currentHumidity");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    console.log(humidity);

};

function getFiveForcast() {
    let name = document.getElementById("cityenter").value;
    var weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&units=imperial&appid=97ffa5948fec702405313e29d2ecf5d9`

    fetch(weatherUrl)
    .then((response) => response.json())
    .then(result => {
        console.log(result);
    })
};

submitButton.addEventListener("click", getFiveForcast);