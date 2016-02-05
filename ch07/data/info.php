<?php
if($_GET["action"] == 'search') {
	header("Content-type: text/json");
	$stulist = array(
		array("Code" => "1001", "Name" => "陶国荣", "Sex" => "男"),
		array("Code" => "1002", "Name" => "李建洲", "Sex" => "女")
	);
	echo json_encode($stulist);
} else if($_GET["action"] == 'save') {
	if($_POST["key"] == '1010') {
		echo "1";
	} else {
		echo "0";
	}
}