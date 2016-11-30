<?php
$url = 'http://dieordie.oss-cn-shanghai.aliyuncs.com';
$date = gmdate('D, d M Y H:i:s').' GMT';
$sec = base64_encode(hash_hmac("sha1","GET\n\n\n".$date."\n/dieordie/",'u0c79I2CTKtwf3GyEv0Q3yiRarQbCp',true));
$auth = "OSS LTAIJ0WF1u7ye1G7:".$sec;
// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Authorization:".$auth."\r\n".
         "Date:".$date."\r\n",
        'method'  => 'GET',
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo json_encode(simplexml_load_string($result));

?>