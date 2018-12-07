<?php
    // Matt Goff
	
	$cityPHP = $_GET["newCity"];
	echo $cityPHP;
	$cityName = array('city'=>$cityPHP);
	$toWrite = json_encode($cityName);
	file_put_contents('cityJSON.json', $toWrite);
	//$myfile = fopen("cityJSON.json", "w") or die("Unable to open file to write!");
	//$myfile = file_get_contents("cityJSON.json");
	//fwrite($myfile, $cityPHP);
    //fclose($myfile);
    echo "City Saved";
	
?>