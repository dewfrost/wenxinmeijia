<?php

$filepath = $_POST['filecode'];

$uid = $_POST['userId'];

$name = "./qrcodeimg/".$uid.".jpg";
if(file_exists($name)){
	$name2 = "./qrcodeimg/".$uid.".jpg";
	exit(json_encode(['data'=>$name2]));
}else{
	$content = get_url_content($filepath);
	file_put_contents($name, $content);
	$name2 = "./qrcodeimg/".$uid.".jpg";
	exit(json_encode(['data'=>$name2]));
}

function get_url_content($url){
    $ch=curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,false);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    $result=curl_exec($ch);
    return $result;
}