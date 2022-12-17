
// console.log(currentDay);

// let day = currentDay.getDate();
// let month = currentDay.getMonth();
// let year = currentDay.getFullYear();

// let currentDate = `${month}-${day}-${year}`;
// console.log(currentDate);
let listGroup = document.getElementById("list-group");
let cityList = [];
console.log("dataOne: ", cityList);

let submitButton = document.getElementById("submit");

function renderHistory() {
    listGroup.innerHTML = "";
    for (let i = cityList.length-1; i >= 0; i--) {
    let buttonEl = document.createElement("button");
    buttonEl.setAttribute("class", "btn-item");
    buttonEl.textContent = cityList[i];
    listGroup.append(buttonEl);
    }
}



function getHistory() {
    let storedData = localStorage.getItem("city");
    if (storedData) {
        cityList = JSON.parse(storedData);
    }
    renderHistory();
}

function getWeather() {
    let name = document.getElementById("cityenter").value;
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=97ffa5948fec702405313e29d2ecf5d9`
    cityList.push(name);
    // console.log("dataTwo: ", cityList);
    localStorage.setItem("city", JSON.stringify(cityList));
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

    // let dateEl = document.getElementById("currentDay");
    // dateEl.textContent = weather.dt;
    
    // console.log(dateEl);

    const unixTimestamp = weather.dt;

    const milliseconds = unixTimestamp * 1000;
    
    const dateObject = new Date(milliseconds);
    
    const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
    console.log(humanDateFormat);
    dateObject.toLocaleString("en-US", {weekday: "long"}); // Monday
    dateObject.toLocaleString("en-US", {month: "long"}); // December
    dateObject.toLocaleString("en-US", {day: "numeric"}); // 9
    dateObject.toLocaleString("en-US", {year: "numeric"}); // 2019
    // dateObject.toLocaleString("en-US", {hour: "numeric"}); // 10 AM
    // dateObject.toLocaleString("en-US", {minute: "numeric"}); // 30
    // dateObject.toLocaleString("en-US", {second: "numeric"}); // 15
    // dateObject.toLocaleString("en-US", {timeZoneName: "short"}); // 12/9/2019, 10:30:15 AM CST

    let temp = document.getElementById("currentTemp");
    temp.textContent = "Temp: " + weather.main.temp + " °F";
    console.log(temp);

    let wind = document.getElementById("currentWind");
    wind.textContent = "Wind: " + weather.wind.speed + " MPH";
    console.log(wind);

    let humidity = document.getElementById("currentHumidity");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    console.log(humidity);

    
    iconId = weather.weather[0].icon;
    let iconElement = document.getElementById("iconOne");
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${iconId}.png"/>`;

    console.log(iconElement);
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
getHistory();
submitButton.addEventListener("click", getFiveForcast);

    
