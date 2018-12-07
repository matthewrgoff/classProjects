<?php
    // Matt Goff
	
	$cityPHP = $_GET['cityPHP'];
	echo $cityPHP."\n";
	//$cityName = array('city'=>$cityPHP);
	//$toWrite = json_encode($cityName);
	$received = file_get_contents('cityJSON.json');
	$data = json_decode($received,true);
	$size = sizeof($data);
	$data[size]=array('city'=>$cityPHP);
	$toWrite = json_encode($data);
	file_put_contents('cityJSON.json', $toWrite);
    echo "City Saved";
	
?>