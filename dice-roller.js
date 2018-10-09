// Matt Goff

function RollSixSidedDice() {
	 document.getElementById("dice1").value = Math.floor(Math.random()*6) + 1;
	 document.getElementById("dice2").value = Math.floor(Math.random()*6) + 1;
	 document.getElementById("dice3").value = Math.floor(Math.random()*6) + 1;
	 document.getElementById("dice4").value = Math.floor(Math.random()*6) + 1;
	 document.getElementById("dice5").value = Math.floor(Math.random()*6) + 1;
}