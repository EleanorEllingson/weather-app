

mapboxgl.accessToken = mapboxToken;

var mapOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-98.4916, 29.4252], // starting position [lng, lat]
    zoom: 9 // starting zoom
};

var map = new mapboxgl.Map(mapOptions);
var restaurants = [
    {
        name: "Freddys",
        about: "Best Steakburgers, fries, and custard!",
        address: "5415 W Loop 1604 N, San Antonio, TX 78253"
    },
    {
        name: "Hopdoddys",
        about: "Juicy, thick burgers, amazing fries!",
        address: "17623 La Cantera Pkwy Suite 101, San Antonio, TX 78257"
    },
    {
        name: "Outback",
        about: "Best 2000 calorie cheesy, bacon fries!",
        address: " I-10 West, San Antonio, TX 78230"
    }
    ];
var indexNumber = 0


for(var i = 0; i < restaurants.length; i++){

    geocode(restaurants[i].address, mapboxToken).then(function (result) {

        console.log(result);
        map.setCenter(result);
        map.setZoom(10)

        var restaurantMarker = new mapboxgl.Marker()
            .setLngLat(result)
            .addTo(map)
            .setPopup(restaurantPopup)


        var restaurantPopup = new mapboxgl.Popup()
            .setHTML(restaurants[indexNumber].name)
            indexNumber++


        restaurantMarker.setPopup(restaurantPopup);
        map.on("click", function (e) {

        })
    })
}
    // geocode("5415 W Loop 1604 N, San Antonio, TX 78253", mapboxToken).then(function (result) {
    //     console.log(result);
    //     map.setCenter(result);
    //     map.setZoom(15)
    //
    //     var freddysMarker = new mapboxgl.Marker()
    //         .setLngLat(result)
    //         .addTo(map)
    //
    //     var freddysPopup = new mapboxgl.Popup()
    //         .setHTML("<p>Freddys</p>")
    //         .addTo(map);
    //
    //     freddysMarker.setPopup(freddysPopup);
    //     map.on("click", function (e) {
    //
    //     })
    // })




