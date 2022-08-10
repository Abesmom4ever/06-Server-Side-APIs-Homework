var cityInputEl = document.querySelector("#locInput");
var btnEl = document.querySelector(".btn");
var currentDay = document.querySelector("#currentDayTime");
var cityName = document.querySelector("#city");
var stateName = document.querySelector("#state");
var countryName = document.querySelector("#country");
var Temp = document.getElementById("Temp");
var allLI = document.getElementsByTagName("li");

//Include current day and time
function currentInfo() {
    var time = moment(new Date()).format("MMM DD, YYYY hh:mm a");
    currentDay.innerHTML = time;
}

async function printLoc(lat, lon) {
    var WeatherURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=7f6146e673eb22dd7b8cb706dd2323dd&units=metric";

    fetch(WeatherURL)
        .then(function (response) {
            if (!response) {
                console.log("LAT AND LON NOT WORKING");
                throw response.json();
            }
            return response.json();
        })
        .then(function (locRes) {
            console.log(locRes);
            console.log(locRes.main.temp);
            // document.getElementById("UVIndex").innerHTML = temp
            //^^ Only last temp is visible
            // temp.length = undefined;

            // function testFunction() {
            //     console.log(locRes.main.temp);
            // }
            // allLI.addEventListener("click", testFunction);

            //^^ maybe write a function within the event listener to run
            //through the specific lat and lon depending on the click.
        });
}

// let response = await fetch(WeatherURL);
// let data;
// if (response.ok) data = await response.json();
// console.log(data)

//Grabbing data for inputted city info
function getLoc(city, country) {
    var LocURL =
        "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "," +
        country +
        "&limit=5&appid=115298cc167755892723b85645f78445";

    fetch(LocURL)
        .then(function (response) {
            // console.log(response);
            if (!response.ok) {
                console.log("NOT WORKING🔴");
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                //create dropdown option for each city, country
                const option = document.createElement("li");
                document.getElementById("dropdown").append(option);
                option.innerHTML =
                    data[i].name +
                    ", " +
                    data[i].state +
                    ", " +
                    data[i].country;
                printLoc(data[i].lat, data[i].lon);
            }

            //for every LI, link to the corresponding lat and lon when client
            //clicks
            for (var i = 0; i < allLI.length; i++) {
                allLI[i].addEventListener("click", function LocButtons() {
                    console.log("Loc Button");
                });
            }

            if (data.length > 1) {
                console.log("more than 1 result");
                return data;
            } else {
                console.log("just one result");
                return data;
            }
        });
}

//function for "Search" button
function formSubmit(event) {
    event.preventDefault();
    console.log("WORKING😀");

    var locBlank = cityInputEl.value;

    //if city, country input is left blank, alert comes up
    if (!locBlank) {
        alert("Please provide a City!");
        return;
    }

    //converting location submission to be an array
    var locSplit = locBlank.split(",");
    console.log(locSplit);
    //separating city and country values
    var cityLoc = locSplit[0];
    var countryLoc = locSplit[1];

    //if city, country are provided then make sure to look up
    //including both values
    if (locBlank.includes(",")) {
        console.log("includes comma");
        //separating city and country and trimming to find lons and lats
        cityLoc = locSplit[0].trim();
        countryLoc = locSplit[1].trim();
        console.log(cityLoc);
        console.log(countryLoc);
        getLoc(cityLoc, countryLoc);
    } else {
        //if only city is provided
        console.log("no comma");
        console.log(locBlank);
        getLoc(cityLoc);
    }
}

btnEl.addEventListener("click", formSubmit);
//Updating time by every minute
setInterval(currentInfo, 60000);
currentInfo();
