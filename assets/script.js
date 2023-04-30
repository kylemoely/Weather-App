// HTML Elements

var formEl = document.getElementById("city-form");
var nameEl = document.getElementById("city-name");
var inputEl = document.getElementById("input");
var sidebarEl = document.querySelector("sidebar");
var currentTempEl = document.getElementById("currentTemp");
var currentWindEl = document.getElementById("currentWind");
var currentHumidEl = document.getElementById("currentHumid");
var currentWindEl = document.getElementById("currentWind");
var daysEl = document.getElementById("days");

//Functions

function saveSearch(){
    localStorage.setItem(inputEl.value, true);
}

function makeHistory(){
    const items = Object.keys(localStorage);
    if(items){
        for(x=0;x<items.length;x++){
            var history = document.createElement("div");
            history.setAttribute("style", "text-align:center; border-radius: 5px; padding: 3px 0px; margin:5px 0px;background-color: rgba(151, 151, 151, 0.599); width: 100%; font-size: 22px;");
            sidebarEl.appendChild(history);
            history.innerHTML = items[x];
            history.addEventListener("click", getWeather);
        }
    }
}

function removePrevious(){
    var dayCards = document.querySelectorAll(".day");
    for(x=0;x<dayCards.length;x++){
        dayCards[x].remove();
    }
}


function getWeather(event){
    if(event.target.className === "btn"){
        event.preventDefault();
    } else{
        inputEl.value = event.target.innerHTML;
    }
    
    if(daysEl.children.length!=0){
        removePrevious();
    }
    
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

            for(x=1;x<days.length;x+=8){
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

makeHistory();
formEl.addEventListener("submit", saveSearch);
formEl.addEventListener("submit", getWeather);