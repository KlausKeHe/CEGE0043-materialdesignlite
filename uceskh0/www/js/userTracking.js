var userMarker;

function trackLocation(){
    if(navigator.geolocation){
        navigator.geolocation.watchPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position){
    if (userMarker){
        myMap.removeLayer(userMarker);
    }
    userMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(myMap).bindPopup("<b>You were here</b>");
    myMap.setView([position.coords.latitude, position.coords.longitude], 13);
}