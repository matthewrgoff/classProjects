// Matt Goff

var contactURLArray = [];
var contactArray = [];
var loadContact = 0;
var currentContactIndex = 0;

function viewCurrentContact() {
	currentContact = contactArray[currentContactIndex];
	
	document.getElementById("fNameID").value = currentContact.firstName;
	document.getElementById("lNameID").value = currentContact.lastName;
	document.getElementById("pNameID").value = currentContact.preferredName;
	document.getElementById("emailID").value = currentContact.email;
	document.getElementById("phoneID").value = currentContact.phoneNumber;
	document.getElementById("cityID").value = currentContact.city;
	document.getElementById("stateID").value = currentContact.state;
	document.getElementById("zipID").value = currentContact.zip;
	document.getElementById("latID").value = currentContact.lat;
	document.getElementById("lngID").value = currentContact.lng;
	document.getElementById("hobbyID").value = currentContact.favoriteHobby;
	document.getElementById("seatID").value = currentContact.seatLocation;
	
	statusUpdate();
}

function saveContacts() {
	console.log("saveContacts()");
   xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Response: ' + this.responseText);
        }
    };
    xmlhttp.open("POST", "saveContacts.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("contacts=" + JSON.stringify(contactArray)); 
}

function loadContactsFromServer() {
	console.log("loadContactsFromServer()");

    // Clear the current contacts.
    contactArray.length = 0;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            contactArray = JSON.parse(this.responseText);

            currentContactIndex = 0;
            viewCurrentContact()
        }
    };

    xmlhttp.open("GET", "loadContacts.php", true);
    xmlhttp.send();
}

function previous() {
	if (currentContactIndex > 0) {
		currentContactIndex--;
    }
	
	currentContact = contactArray[currentContactIndex];
    viewCurrentContact();
	
	// hides button when at first contact
	if (currentContactIndex == 0) {
		btn.classList.add("hide-me");
	}
	
	if (currentContactIndex > 0) {
		btn.classList.add("show");
	}
}

function next() {
	if (currentContactIndex < (contactArray.length-1)) {
		currentContactIndex++;
	}
	
	currentContact = contactArray[currentContactIndex];
    viewCurrentContact();
	
	// hides button when at last contact
	if (currentContactIndex == (contactArray.length-1)) {
		btn2.classList.add("hide-me");
	}
	
	if (currentContactIndex < (contactArray.length-1)) {
		btn2.classList.add("show");
	}
}

function add() {
	//var x = getElementById("");
	
	//x.add();
}

function remove() {
	
}

function zipBlurFunction() {
	getPlace();
}

// accesses php file
function getPlace() {
	var zip = document.getElementById("zipID").value
	
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            var place = result.split(', ');
            if (document.getElementById("cityID").value == "")
                document.getElementById("cityID").value = place[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = place[1];
        }
    }
	xhr.open("GET", "zipCityState.php?zip=" + zip);
    xhr.send(null);
}

function initApplication() {
    console.log('Mustang Version 3 Starting!'); 
	loadIndex();
}

// loads the index file that holds json file
function loadIndex() {
	var indexRequest = new XMLHttpRequest();
	indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
	indexRequest.onload = function() {
        console.log("Index:" + indexRequest.responseText);
        document.getElementById("indexID").innerHTML = indexRequest.responseText;
        contactIndex = JSON.parse(indexRequest.responseText);
        for (i = 0; i < contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
		loadContacts();
    }
	
	indexRequest.onerror = function() {
		console.log("Connection error");
	};
	
    indexRequest.send();
}

// loads the specific json files students provided
function loadContacts() {
    contactArray.length = 0;
    loadContact = 0;

    if (contactURLArray.length > loadContact) {
        loadNextContact(contactURLArray[loadContact]);
    }
	
	statusUpdate();
}

function loadNextContact(data) {
    console.log("URL: " + data);
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', data);
    contactRequest.onload = function() {
        console.log(contactRequest.responseText);
        var contact;
        contact = JSON.parse(contactRequest.responseText);
        contactArray.push(contact);
        document.getElementById("contactsID").innerHTML = JSON.stringify(contactArray);

        loadContact++;
		
        if (contactURLArray.length > loadContact) {
            loadNextContact(contactURLArray[loadContact]);
        }
    }

    contactRequest.send();
}

// displays when contacts are done loading and displays how many contacts there are
function statusUpdate() {
	document.getElementById("statusUpdateID").innerHTML = "Contact " + (currentContactIndex+1) + " of " + contactArray.length;
}
