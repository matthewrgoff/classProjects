// Matt Goff

var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
	
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
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
	pageCounter++;
	if (pageCounter > 3) {
		btn.classList.add("hide-me");
	}
});

function renderHTML(data){
	var HTMLstring = "";
	
	for (i = 0; i < data.length; i++) {
		HTMLstring += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";
		
		for (n = 0; n < data[i].foods.likes.length; n++) {
			if (n == 0) {
				HTMLstring += data[i].foods.likes[n];
			} else {
				HTMLstring += " and " + data[i].foods.likes[n];
			}
		}
		
		HTMLstring += ' and dislikes ';

		for (n = 0; n < data[i].foods.dislikes.length; n++) {
			if (n == 0) {
				HTMLstring += data[i].foods.dislikes[n];
			} else {
				HTMLstring += " and " + data[i].foods.dislikes[n];
			}
		}
		
		HTMLstring += '.</p>';
		
	}
	
	animalContainer.insertAdjacentHTML('beforeend', HTMLstring);
}
