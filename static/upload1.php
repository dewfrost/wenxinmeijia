<?php

$filepath = $_POST['filecode'];
 $filename = array_reverse(explode('/',$filepath))[0];

$name = "./headimg/".$filename;
if(file_exists($name)){
	exit(json_encode(['data'=>$name]));
}else{
	$content = file_get_contents($filepath);
	file_put_contents($name, $content);
	exit(json_encode(['data'=>$name]));
}