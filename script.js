function getApi(lat, lon) {
    var requestURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=115298cc167755892723b85645f78445";

    fetch(getApi).then(function (response) {});
}
