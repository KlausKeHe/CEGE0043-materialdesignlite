function trackAndCircle()
{ getEarthquakes());
  addPointLinePoly();
  trackLocation();
}

function startup() {
document.addEventListener('DOMContentLoaded', function() {
trackAndCircle();
}, false);
}