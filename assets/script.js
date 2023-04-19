// HTML Elements

var formEl = document.getElementById("city-form");
var nameEl = document.getElementById("city-name");
var inputEl = document.getElementById("input");
var currentTempEl = document.getElementById("currentTemp");
var currentWindEl = document.getElementById("currentWind");
var currentHumidEl = document.getElementById("currentHumid");
var currentWindEl = document.getElementById("currentWind");
var daysEl = document.getElementById("days");

//Functions

function getWeather(event){
    event.preventDefault();
    var city = inputEl.value;
    var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +city+ "&limit=5&appid=aa78702f90ba6bd4eaacab62858a195d";

    fetch(cityURL)
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        var long = Number.parseFloat(data[0].lon).toFixed(2);
        var latt = Number.parseFloat(data[0].lat).toFixed(2);
        var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latt + "&lon=" + long + "&units=imperial&appid=aa78702f90ba6bd4eaacab62858a195d";

        fetch(weatherURL)
        .then(function(response2){
            return response2.json();
        })
        .then(function(data2){
            console.log(data2);
            var days = data2.list;
            console.log(dayjs(days[0].dt*1000).format("MM/DD/YYYY"));
            nameEl.innerHTML = data2.city.name + " " + dayjs(days[0].dt*1000).format("MM/DD/YYYY");
            currentTempEl.innerHTML ="Temp: " + days[0].main.temp + "F";
            currentWindEl.innerHTML = "Wind: " + days[0].wind.speed + " MPH";
            currentHumidEl.innerHTML = "Humidity: " + days[0].main.humidity + "%";

            for(x=1;x<6;x++){
                var newDay = document.createElement("div");
                newDay.setAttribute("class", "day");
                daysEl.appendChild(newDay);

                var newDate = document.createElement("h1");
                newDate.innerHTML = dayjs(days[x].dt*1000).format("MM/DD/YYYY");
                newDay.appendChild(newDate);

                var newDayskies = document.createElement("div");
                newDayskies.innerHTML = days[x].weather[0].main;
                newDay.appendChild(newDayskies);

                var newDayTemp = document.createElement("div");
                newDayTemp.innerHTML = "Temp: " + days[x].main.temp + "F";
                newDay.appendChild(newDayTemp);

                var newDayWind = document.createElement("div");
                newDayWind.innerHTML = "Wind: " + days[x].wind.speed + " MPH";
                newDay.appendChild(newDayWind);

                var newDayHumid = document.createElement("div");
                newDayHumid.innerHTML = "Humidity: " + days[x].main.humidity + "%";
                newDay.appendChild(newDayHumid);
            }
        })
    })
}

formEl.addEventListener("submit", getWeather);