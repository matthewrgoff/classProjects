// Matt Goff

var gMap;

var favoritePlaces = [
    {"content":"Plainfield, Illinois. My home town", "coordinates":{"lat":41.6322,"lng":-88.2120}},
    {"content":"Hawaii, my favorite vacation I ever went on", "coordinates":{"lat":19.8968,"lng":-155.5828}},
    {"content":"San Antonio, Texas. I got family who live here", "coordinates":{"lat":29.4241,"lng":-98.4936}},
    {"content":"Austin, Texas. Where my sister lives", "coordinates":{"lat":30.2672,"lng":-97.7431}},
    {"content":"Garanteed Rate Field, Chicago. Home of the White Sox", "coordinates":{"lat":41.8299,"lng":-87.6338}},
    {"content":"Nashville, Tennessee. One of my favorite vacation spots", "coordinates":{"lat":36.1627,"lng":-86.7816}},
    {"content":"Lewis University, Romeoville, Illinois. Attending college here", "coordinates":{"lat":41.6048,"lng":-88.0805}},
    {"content":"Springfield, Illinois. Where my sister lives", "coordinates":{"lat":39.7817,"lng":-89.6501}}
]

// starts at the last place on my list
var currentPlaceIndex = favoritePlaces.length-1;
var currentPlace = favoritePlaces[currentPlaceIndex];
var score = 0;
 
function initMap() {
    gMap = new google.maps.Map(document.getElementById('myMapID'), {
        center: {lat: 41.878, lng: -87}, zoom: 4});

    // calls updateGame() so that the user knows if they are getting closer or not
    google.maps.event.addListener(gMap, 'idle', function() {
        updateGame()
    });
}

function updateGame() {
    console.log('function UpdateGame()');
    var zoomLevel = gMap.getZoom()
    var inBounds = false;

    console.log("zoomLevel:"+zoomLevel);
	
	console.log("coords:" + JSON.stringify(currentPlace.coordinates));
    if (gMap.getBounds().contains(currentPlace.coordinates)) {
        var inBounds = true;
        console.log("Location inbounds");
    }
	
	// displays hints when user is getting close
	if ((zoomLevel > 5) && (inBounds)) {
		setHint("You are getting warmer!");
	}
	
	if ((zoomLevel > 6) && (inBounds)) {
		setHint("You're almost there!");
	}

    if ((zoomLevel > 7) && (inBounds)) {
        console.log("Found");
        addMarker(currentPlace);
		score = score + 1;
		setScore(score);
		setHint("You found a location! Click reset map to start searching for the next location.");
        nextPlace();
    }
	
	if (score == 8){
		setHint("Congratulations, you won the game!!!");
	}

}

function nextPlace(){
	currentPlaceIndex--;
	currentPlace = favoritePlaces[currentPlaceIndex];
}

function addMarker(markerContent){
	var marker = new google.maps.Marker({position:markerContent.coordinates, map:gMap});

    if (markerContent.content) {
        var infoWindow = new google.maps.InfoWindow({"content":markerContent.content});
        marker.addListener("click", function() { infoWindow.open(gMap, marker) });
    }
}

function setHint(hint) {
    document.getElementById("hint-id").value = hint;  
}

function setScore() {
    document.getElementById("score-id").value = score; 
}

function openHelp() {
    var help = document.getElementById('helpID');
    help.style.display = "block";
}

function closeHelp() {
    var help = document.getElementById('helpID');
    help.style.display = "none";
}

function winNow() {
	setHint("Congratulations, you win!");
	score = 8;
	setScore(score);
	console.log("Congratulations, you win!");
	
	// displays all markers
	var marker1 = new google.maps.Marker({position:{lat:41.6322,lng:-88.2120}, map:gMap});
	var infoWindow1 = new google.maps.InfoWindow({content:'Plainfield, Illinois. My home town'});
    marker1.addListener('click', function() {
        infoWindow1.open(gMap, marker1);
    });
	var marker2 = new google.maps.Marker({position:{lat:19.8968,lng:-155.5828}, map:gMap});
	var infoWindow2 = new google.maps.InfoWindow({content:'Hawaii, my favorite vacation I ever went on'});
    marker2.addListener('click', function() {
        infoWindow2.open(gMap, marker2);
    });
	var marker3 = new google.maps.Marker({position:{lat:29.4241,lng:-98.4936}, map:gMap});
	var infoWindow3 = new google.maps.InfoWindow({content:'San Antonio, Texas. I got family who live here'});
    marker3.addListener('click', function() {
        infoWindow3.open(gMap, marker3);
    });
	var marker4 = new google.maps.Marker({position:{lat:30.2672,lng:-97.7431}, map:gMap});
	var infoWindow4 = new google.maps.InfoWindow({content:'Austin, Texas. Where my sister lives'});
    marker4.addListener('click', function() {
        infoWindow4.open(gMap, marker4);
    });
	var marker5 = new google.maps.Marker({position:{lat:41.8299,lng:-87.6338}, map:gMap});
	var infoWindow5 = new google.maps.InfoWindow({content:'Garanteed Rate Field, Chicago. Home of the White Sox'});
    marker5.addListener('click', function() {
        infoWindow5.open(gMap, marker5);
    });
	var marker6 = new google.maps.Marker({position:{lat:36.1627,lng:-86.7816}, map:gMap});
	var infoWindow6 = new google.maps.InfoWindow({content:'Nashville, Tennessee. One of my favorite vacation spots'});
    marker6.addListener('click', function() {
        infoWindow6.open(gMap, marker6);
    });
	var marker7 = new google.maps.Marker({position:{lat:41.6048,lng:-88.0805}, map:gMap});
	var infoWindow7 = new google.maps.InfoWindow({content:'Lewis University, Romeoville, Illinois. Attending college here'});
    marker7.addListener('click', function() {
        infoWindow7.open(gMap, marker7);
    });
	var marker8 = new google.maps.Marker({position:{lat:39.7817,lng:-89.6501}, map:gMap});
	var infoWindow8 = new google.maps.InfoWindow({content:'Springfield, Illinois. Where my sister lives'});
    marker8.addListener('click', function() {
        infoWindow8.open(gMap, marker8);
    });
}