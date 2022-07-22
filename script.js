var cityInputEl = document.querySelector("#locInput");
var btnEl = document.querySelector(".btn");
var currentDay = document.querySelector("#currentDayTime");
const moment = require("moment");

function currentInfo() {
    currentDay.textContent = moment().format("MMMM, DD, YYYY");
}

//fetching API for weather info
function getApi(lat, lon) {
    var requestURL =
        "https://api.openweathermap.org/data/3.0/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=115298cc167755892723b85645f78445";
    fetch(requestURL)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                console.log("NOT WORKING!🟥");
                throw response.json();
            }
            return response.json();
        })
        .then(function (something) {
            console.log(something);
        });
}

//function for "Search" button
function formSubmit(event) {
    event.preventDefault();
    console.log("WORKING😀");

    var locBlank = cityInputEl.value;

    //if city, country input is left blank, alert comes up
    if (!locBlank) {
        alert("🔷You need a search input value!🔷");
        return;
    }

    //converting location submission to be an array
    var locSplit = locBlank.split(",");
    console.log(locSplit);

    //separating city and country values
    var cityLoc = locSplit[0];
    var countryLoc = locSplit[1];

    //if only one value is provided, an alert will show notifying client
    //to provide both values
    if (!cityLoc || !countryLoc) {
        alert("🔴Please provide both a City and Country🔴");
    }

    //separating city and country and trimming to find lons and lats
    cityLoc = locSplit[0].trim();
    countryLoc = locSplit[1].trim();

    console.log(cityLoc);
    console.log(countryLoc);

    getApi(cityLoc, countryLoc);
}

btnEl.addEventListener("click", formSubmit);
currentInfo();
