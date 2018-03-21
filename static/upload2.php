<?php

$filepath = $_POST['filecode'];

$uid = $_POST['userId'];

$name = "./qrcodeimg/".$uid.".jpg";
if(file_exists($name)){
	$name2 = "./qrcodeimg/".$uid.".jpg";
	exit(json_encode(['data'=>$name2]));
}else{
	$content = file_get_contents($filepath);
	file_put_contents($name, $content);
	$name2 = "./qrcodeimg/".$uid.".jpg";
	exit(json_encode(['data'=>$name2]));
}