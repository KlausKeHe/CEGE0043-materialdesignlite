var client;
var earthquakelayer;

var testMarkerRed = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'red'
    });

var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
    });

function addPointLinePoly(){
    //add a point
    L.marker([51.5, -0.09]).addTo(myMap).bindPopup("<b>Hello world!</b><br/>I am a popup.").openPopup();

    //add a circle
    L.circle([51.508,-0.11],500,{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(myMap).bindPopup("I am a circle.");

    //add a polygon with 3 end points(i.e. a triangle)
    var myPolygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
        ],{
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(myMap).bindPopup("I am a polygon.");
}

function getEarthquakes(){
    client = new XMLHttpRequest();
    client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
    client.onreadystatechange = earthquakeResponse;
    client.send();
}

//Wait for the response from data server, and process once received
function earthquakeResponse(){
    if(client.readyState == 4){
        var earthquakedata = client.responseText;
        loadEarthquakelayer(earthquakedata);
        }
    }

//convert received txt to JSON and add to map
function loadEarthquakelayer(earthquakedata){
    var earthquakejson = JSON.parse(earthquakedata);

    earthquakelayer = L.geoJson(earthquakejson, {
        // create points
        pointToLayer: function(feature, latlng)
        {
        if(feature.properties.mag > 1.75){
            return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place+"</b>");
        }else{
            return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place+"</b>");;
        }
            },
        }).addTo(myMap);
    myMap.fitBounds(earthquakelayer.getBounds());
}