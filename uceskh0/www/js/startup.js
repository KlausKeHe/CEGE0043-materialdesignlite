function trackAndCircle()
{ getEarthquakes());
  addPointLinePoly();
  trackLocation();
  loadW3HTML();
}

function startup() {
document.addEventListener('DOMContentLoaded', function() {
trackAndCircle();
getPort();
}, false);
}

function loadW3HTML(){
w3.includeHTML();}