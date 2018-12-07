<?php
    // Matt Goff
	
	$cityPHP = $_GET["newCity"];
	$myfile = fopen("cityJSON.json", "w") or die("Unable to open file to write!");
	fwrite($myfile, $cityPHP);
    fclose($myfile);
    echo "City Saved";
?>