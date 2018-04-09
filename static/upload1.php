<?php

$filepath = $_POST['filecode'];
 $filename = array_reverse(explode('/',$filepath))[0];

$name = "./headimg/".$filename;
if(file_exists($name)){
	exit(json_encode(['data'=>$name]));
}else{
	$content = get_url_content($filepath);
	file_put_contents($name, $content);
	exit(json_encode(['data'=>$name]));
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