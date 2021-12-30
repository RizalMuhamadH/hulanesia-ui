<?php

if(! function_exists('parse_json')){
    function parse_json($json){
        $json = json_decode($json->getBody()->getContents(), true);
        return $json['hits'];
    }
}