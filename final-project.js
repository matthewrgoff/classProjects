// Matt Goff

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=7f9eec2b2ce37b631dbff8f10680c0c0&units=imperial';
var weatherContainer = document.getElementById("weather-info");


function initApplication() {
    console.log('Final Project Starting!'); 
}

// Accesses the json file for the city user wants
function submitCity() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', api + document.getElementById("city").value + apiKey);
	ourRequest.onload = function(){
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData);
		} else {
			console.log("We connected to the server, but it returned an error.");
		}
	};
	
	ourRequest.onerror = function() {
    console.log("Connection error");
	};
	
	ourRequest.send();
}

function saveCity() {
	console.log("saveCity");
	//var newCity = document.getElementById("city").value;
	var newRequest = new XMLHttpRequest();
	var newCity = document.getElementById("city").value;
	
	newRequest.onreadystatechange = function () {
		//newCity = document.getElementById("city").value;
	}
	newRequest.open('GET', 'https://matthewrgoff.azurewebsites.net/saveCity.php?cityPHP='+newCity);
	newRequest.send();
}

// formats the json data into a table
function renderHTML(data) {
	console.log("renderHTML");
	console.log(JSON.stringify(data));
	var HTMLstring = "";
	
	HTMLstring += "<table align='center' border='1'>"
		HTMLstring += "<tr><td>City: " + "</td>" + "<td>" + data.name + "</td></tr>"
		HTMLstring += "<tr><td>Weather Description: " + "</td>" + "<td>" + data.weather[0].description + "</td></tr>"
		HTMLstring += "<tr><td>Current Temperature: " + "</td>" + "<td>" + data.main.temp + "&deg F</td></tr>"
		HTMLstring += "<tr><td>Minimum Temperature: " + "</td>" + "<td>" + data.main.temp_min + "&deg F</td></tr>"
		HTMLstring += "<tr><td>Maximum Temperature: " + "</td>" + "<td>" + data.main.temp_max + "&deg F</td></tr>"
		HTMLstring += "<tr><td>Humidity: " + "</td>" + "<td>" + data.main.humidity + "</td></tr>"
		HTMLstring += "<tr><td>Wind Speed: " + "</td>" + "<td>" + data.wind.speed + " mph</td></tr>"
		HTMLstring += "<tr><td>Latitude: " + "</td>" + "<td>" + data.coord.lat + "</td></tr>"
		HTMLstring += "<tr><td>Longitude: " + "</td>" + "<td>" + data.coord.lon + "</td></tr>"
	HTMLstring += "</table><br>"
	
	weatherContainer.insertAdjacentHTML('beforeend', HTMLstring);
}
