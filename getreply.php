<?php

// get the message parameter from URL
$message = $_GET["message"];

$result = exec("python client.py $message");

echo $result;
?>
