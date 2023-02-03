var weatherAPI = '127337ecf2639c829a50c27f0e45f8c0';
var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var googleResultsAPI = "https://serpapi.com/search.json?engine=google&q=Local+Landmarks&location="
var serpAPI = "fad54d11f84d981eed74fed7d8a3e7f171d9020cc347f9e7bd97b5cb29bdb162";

// import { getJson } from "serpapi"; {
	
// const params = {
//   api_key: "fad54d11f84d981eed74fed7d8a3e7f171d9020cc347f9e7bd97b5cb29bdb162",
//   q: "Local Landmarks",
//   google_domain: "google.com",
//   gl: "us",
//   hl: "en",
//   device: "mobile"
// };

// // Show result as JSON
// const response = await getJson("google", params);
// console.log(response);}

function getWeather() {
    var city = $("form").children("#user-input").val();
    fetch(fiveDayForecast + city + "&units=imperial&limit=1&appid=" + weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
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
            }
                fetch(googleResultsAPI + city + "&google_domain=google.com&gl=us&hl=en&api_key=" + serpAPI)
                .then(function (response3) {
                    console.log(response3);
                    return response3.json();
                })
        })
}

$("#search").on("click", getWeather)