var weatherAPI = '127337ecf2639c829a50c27f0e45f8c0';
var currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var googleAPI = 'AIzaSyCX19TrHnBNF_0Rm_1QoWhIjuaBsr8y1AU';

function getWeather() {
    var city = $("form").children("#user-input").val();
    fetch(fiveDayForecast + city + "&units=imperial&limit=1&appid=" + weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < data.list.length; i = i + 8) {
                $("#day-" + i).empty();
                $("#temp-" + i).empty();
                $("#wind-" + i).empty();
                $("#hum-" + i).empty();
                $("#day-" + i).append(`${moment(data.list[i].dt, "X").format('MM/DD/YYYY')} <img id="weather-icon1" src= "http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`);
                $("#temp-" + i).append("Temp: " + `${data.list[i].main.temp}` + "°F");
                $("#wind-" + i).append("Wind: " + `${data.list[i].wind.gust}` + " MPH");
                $("#hum-" + i).append("Humidity: " + `${data.list[i].main.humidity}` + " %");
            }
            fetch(currentWeather + city + "&units=imperial&appid=" + weatherAPI)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (data2) {
                    $("#weather-header").empty();
                    $("#city-name").empty();
                    $("#weather-header").append("Weather Forecast for " + `${data2.name}`);
                    $("#city-name").append(`${data2.name} ${moment(data2.dt, "X").format('MM/DD/YYYY')} <img id="weather-icon" src= "http://openweathermap.org/img/wn/${data2.weather[0].icon}@2x.png">`)
                    var currentTemp = data2.main.temp;
                    $("#cur-temp").text("Temp: " + currentTemp + "°F");
                    var currentWind = data2.wind.speed;
                    $("#cur-wind").text("Wind: " + currentWind + " MPH");
                    var currentHumidity = data2.main.humidity;
                    $("#cur-hum").text("Humidity: " + currentHumidity + " %")
                })
        })
}

$("#search").on("click", getWeather)