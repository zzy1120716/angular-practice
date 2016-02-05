<?php
header("Content-type: text/json");
$stulist = array(
	array("Code" => "10101", "Name" => "刘真真", "Score" => "530"),
	array("Code" => "10102", "Name" => "张明基", "Score" => "460"),
	array("Code" => "10103", "Name" => "舒虎", "Score" => "660"),
	array("Code" => "10104", "Name" => "周小敏", "Score" => "500"),
	array("Code" => "10105", "Name" => "陆明明", "Score" => "300")
);
echo json_encode($stulist);