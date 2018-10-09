// Matt Goff

var gMap;

var favoritePlaces = [
    {content:'Plainfield, Illinois', coordinates:{lat:41.6322,lng:-88.2120}},
    {content:'Hawaii', coordinates:{lat:19.8968,lng:-155.5828}},
    {content:'San Antonio, Texas', coordinates:{lat:29.4241,lng:-98.4936}},
    {content:'Austin, Texas', coordinates:{lat:30.2672,lng:-97.7431}},
    {content:'Garanteed Rate Field, Chicago', coordinates:{lat:41.8299,lng:-87.6338}},
    {content:'Nashville, Tennessee', coordinates:{lat:36.1627,lng:-86.7816}},
    {content:'Lewis University, Romeoville, Illinois', coordinates:{lat:41.6048,lng:-88.0805}},
    {content:'Springfield, Illinois', coordinates:{lat:39.7817,lng:-89.6501}},
];

var currentPlaceIndex = 7;
var currentPlace = favoritePlaces[currentPlaceIndex];
var score = 8;

function initApplication() {
    console.log('Map Mania V1 is Starting');
}
 
function initMap() {
    gMap = new google.maps.Map(document.getElementById('myMapID'), {
        center: {lat: 41.878, lng: -87}, zoom: 4});

    // calls updateGame() so that the user knows if they are getting closer or not
    google.maps.event.addListener(gMap, 'idle', function() {
        updateGame()
    });
	
	// adds a marker on my second location and displays a message when clicked
    var marker = new google.maps.Marker({position:{lat:19.8968,lng:-155.5828}, map:gMap});

    var infoWindow = new google.maps.InfoWindow({content:'Hawaii, my favorite vacation I ever went on.'});
    marker.addListener('click', function() {
        infoWindow.open(gMap, marker);
    });

    SetHint("You are getting closer.");
    SetScore(score);
}

function updateGame() {
    console.log('function UpdateGame()');
    var zoomLevel = gMap.getZoom()
    var inBounds = false;

    // Check if Plainfield, Illinois is within range
    if (gMap.getBounds().contains({lat:41.6322,lng:-88.2120})) {
        inBounds = true;
    }
	// displays true if it's in bounds and false if not
    console.log("inBounds:"+inBounds+" zoomLevel:"+zoomLevel);
}

function SetHint(hint) {
    document.getElementById("hint-id").value = hint;  
}

function SetScore() {
    document.getElementById("score-id").value = score; 
}