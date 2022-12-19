
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


    const unixTimestamp = weather.dt;

    const milliseconds = unixTimestamp * 1000;
    
    const dateObject = new Date(milliseconds);
    
    let humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
    let dateFormat = document.getElementById("currentDay");
    dateFormat.innerHTML = `<p id="currentDay">${humanDateFormat}</p>`;

    console.log(humanDateFormat);
    dateObject.toLocaleString("en-US", {weekday: "long"}); // Monday
    dateObject.toLocaleString("en-US", {month: "long"}); // December
    dateObject.toLocaleString("en-US", {day: "numeric"}); // 9
    dateObject.toLocaleString("en-US", {year: "numeric"}); // 2019

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

        let list = result.list;
        let forcastHum = document.getElementsByClassName("humidity");
        let forcastTemp = document.getElementsByClassName("temp");
        let forcastWind = document.getElementsByClassName("wind");

        for (let i = 0; i < 5; i++) {
            forcastTemp[i].innerHTML = `Temp: ${list[i].main.temp} °F  `;
        }

        for (let i = 0; i < 5; i++) {
            forcastWind[i].innerHTML = `Wind:  ${list[i].wind.speed} MPH`;
        }
       
        for (let i = 0; i < forcastHum.length; i++) {
            forcastHum[i].innerHTML = `Humidity: ${list[i].main.humidity} %`;
        }

        for (let i =0; i < 5; i++) {
            let unixTimeStamp = result.list[i].dt;
            console.log(unixTimeStamp);
    
            let milliseconds = unixTimeStamp;
            
            let dateObject = new Date(milliseconds);
            let humanDateFormat = dateObject.toLocaleString();
            let forcastFormat = document.getElementsByClassName("date");
            forcastFormat[i].innerHTML = `${humanDateFormat}`;
        }

        console.log(forcastTemp);
        console.log(result);
    })
};
getHistory();
submitButton.addEventListener("click", getFiveForcast);

    
