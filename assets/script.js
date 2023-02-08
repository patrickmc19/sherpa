var weatherAPI = '127337ecf2639c829a50c27f0e45f8c0';
var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var googleURL = "https://maps.googleapis.com/maps/api/js?key=";
var googleAPI = "AIzaSyBxSpUyKagJm9BARSv8C9PY1cLN7SLEKNE";
const cards = document.querySelectorAll(".card");

function getResults() {
    var city = $("form").children("#user-input").val();
    if (city.length > 0) {
        $("#invalid").empty();
        fetch(fiveDayForecast + city + "&units=imperial&limit=1&appid=" + weatherAPI)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                for (let i = 0; i < data.list.length; i = i + 8) {
                    $("#weather-header").empty()
                    $("#day-" + i).empty();
                    $("#temp-" + i).empty();
                    $("#wind-" + i).empty();
                    $("#hum-" + i).empty();
                    $("#weather-header").append("Current Forecast for " + `${data.city.name}`)
                    $("#day-" + i).append(`${moment(data.list[i].dt, "X").format('MM/DD/YYYY')} <img id="weather-icon1" src= "http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`);
                    $("#temp-" + i).append("Temp: " + `${data.list[i].main.temp}` + "°F");
                    $("#wind-" + i).append("Wind: " + `${data.list[i].wind.gust}` + " MPH");
                    $("#hum-" + i).append("Humidity: " + `${data.list[i].main.humidity}` + " %");

                    cards.forEach((card) => {
                        card.style.opacity = 1;
                    });
                }
            })
    } else {
        $("#invalid").text("Not a valid city.");
        $("#weather-header").empty();
        $("#day-0").empty();
        $("#temp-0").empty();
        $("#wind-0").empty();
        $("#hum-0").empty();
        $("#day-8").empty();
        $("#temp-8").empty();
        $("#wind-8").empty();
        $("#hum-8").empty();
        $("#day-16").empty();
        $("#temp-16").empty();
        $("#wind-16").empty();
        $("#hum-16").empty();
        $("#day-24").empty();
        $("#temp-24").empty();
        $("#wind-24").empty();
        $("#hum-24").empty();
        $("#day-32").empty();
        $("#temp-32").empty();
        $("#wind-32").empty();
        $("#hum-32").empty();

    }
}

function initMap() {
    infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: 32.715736,
            lng: -117.161087
        }
    });
    var city = $("form").children("#user-input").val();
    const request = {
        query: city,
        fields: ['name', 'geometry', 'formatted_address', 'photos'],
    };
    $("#city-results").empty();
    $("#city-results").append(city);
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        console.log(request);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

$("#search").on("click", getResults)
$("#search").on("click", initMap)