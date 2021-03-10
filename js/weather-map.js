$(document).ready(function () {

    "use strict";


    mapboxgl.accessToken = mapboxToken;

    var mapOptions = {
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [-98.4916, 29.4252], // starting position [lng, lat]
        zoom: 3 // starting zoom
    };

    // var map = new mapboxgl.Map(mapOptions);

    mapboxgl.accessToken = 'pk.eyJ1IjoiZWVsbGluZ3NvbiIsImEiOiJja2gzbWJuazQwNW5xMnFyejQ1Y2xyaWx3In0.G2paM7nO8c81S34Na_FqAw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-79.4512, 43.6568],
        zoom: 3
    });
    var geoCoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false
    });

    map.addControl(
        geoCoder
    );

    var marker = new mapboxgl.Marker({draggable: true}).setLngLat([-79.4512, 43.6568])
        .addTo(map);
    map.on('load', function() {

        geoCoder.on('result', function(ev) {

            if(ev.result.geometry.coordinates){

                marker.setLngLat(ev.result.geometry.coordinates)
                updatePage(ev.result.geometry.coordinates[0], ev.result.geometry.coordinates[1])

            }
        });
    });
marker.on('dragend', function (){
    var lonLat = marker.getLngLat();
    updatePage(lonLat.lng, lonLat.lat);
})





function updatePage(lon, lat) {

    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: lat,
        lon: lon,
        units: "imperial"
    }).done(function (data) {
        console.log(data);
        weather5day(data.daily.slice(0, 5));
        console.log(data.current)
        currentWeather(data.current);
    });
}
    function currentWeather(current) {
        document.querySelector(".current-weather").innerHTML = "";
        var h5;

        h5 = document.createElement("h5")
        h5.innerText = "Current Temperature " + Math.round(current.temp) + " °F"
        h5 = document.querySelector(".current-weather").appendChild(h5)


    }
function weather5day(days){
    document.querySelector("#days").innerHTML = "";
    var h5, ul, li;
    days.forEach(function (day){
        var date = new Date(day.dt*1000);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        h5 = document.createElement("h5");
        h5.innerText = days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
        ul = document.createElement("ul");

        ul.appendChild(h5)
        var rain = day.rain * 1;
        if(isNaN(rain)){
            rain = 0;
        }
        var productMapped = [
            "High temperature = " + Math.round(day.temp.max) + " °F",
            "Low temperature = " + Math.round(day.temp.min) + " °F",
            "Humidity = " + day.humidity + "%",
            "Weather conditions = " + day.weather[0].description
        ]
        for(var index in productMapped) {
            li = document.createElement("li");
            li.innerText = productMapped[index];
            ul.appendChild(li);

        }

        document.querySelector("#days").appendChild(ul)
    })


}

// $('#update').click(updatePage);
updatePage(-79.4512, 43.6568)



});
