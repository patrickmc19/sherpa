var weatherAPI = '127337ecf2639c829a50c27f0e45f8c0';
var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var googleURL = "https://maps.googleapis.com/maps/api/js?key=";
var googleAPI = "AIzaSyBxSpUyKagJm9BARSv8C9PY1cLN7SLEKNE";
const cards = document.querySelectorAll(".card");

function getResults() {
    var city = $("form").children("#user-input").val();
    fetch(fiveDayForecast + city + "&units=imperial&limit=1&appid=" + weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < data.list.length; i = i + 8) {
                $("#city-results").empty()
                $("#weather-header").empty()
                $("#day-" + i).empty();
                $("#temp-" + i).empty();
                $("#wind-" + i).empty();
                $("#hum-" + i).empty();
                $("#city-results").append("Local Landmarks in " + `${data.city.name}`)
                $("#weather-header").append("Current Forecast for " + `${data.city.name}`)
                $("#day-" + i).append(`${moment(data.list[i].dt, "X").format('MM/DD/YYYY')} <img id="weather-icon1" src= "http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`);
                $("#temp-" + i).append("Temp: " + `${data.list[i].main.temp}` + "°F");
                $("#wind-" + i).append("Wind: " + `${data.list[i].wind.gust}` + " MPH");
                $("#hum-" + i).append("Humidity: " + `${data.list[i].main.humidity}` + " %");

                cards.forEach((card) => {
                  card.style.opacity = 1;
                });

            }
            fetch(googleURL + googleAPI + " ")
        })
}

$("#search").on("click", getResults)