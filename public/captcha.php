<?php
$name=stripslashes($_POST["name"]);
$email=stripslashes($_POST["email"]);
$message=stripslashes($_POST["message"]);
$secret="6Lczfy8UAAAAAHL1MQl9LIYlHLwqNBoGc5zKJCik";
$response=$_POST["captcha"];
$devices=$_POST["devices"];
$quote = $devices * 31;

$verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
$captcha_success=json_decode($verify);
$responseObj->verified = false;

if ($captcha_success->success==true) {
  //This user is verified by recaptcha
  $responseObj->verified = true;
  $responseObj->quote = $quote;
}

$jsonResponse = json_encode($responseObj);
echo $jsonResponse;
