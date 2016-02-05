<?php
if($_GET["action"] == 'search') {
	if($_GET["id"] == '1010') {
		echo "1";
	} else {
		echo "0";
	}
} else if($_GET["action"] == 'update') {
	if($_POST["key"] == '1011' && $_GET["update"] == 'true') {
		echo "1";
	} else {
		echo "0";
	}
} else if($_GET["action"] == 'save') {
	if($_POST["key"] == '1012') {
		echo "1";
	} else {
		echo "0";
	}
}