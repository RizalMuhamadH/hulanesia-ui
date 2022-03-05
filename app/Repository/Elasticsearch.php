<?php

namespace App\Repository;

use Elasticsearch\ClientBuilder;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class Elasticsearch {
    public function get($index, $params)
    {
        $http = new Client([
            'headers'   => ['Content-Type' => 'application/json'],
        ]);

        if($params) {
            $body = [
                'body' => json_encode($params)
            ];
        } else {
            $body = [];
        }

        return $http->request('GET', env('ELASTICSEARCH_HOST', '').$index.'/_search', $body);
    }

    public function doc($index, $id)
    {
        $http = new Client([
            'headers'   => ['Content-Type' => 'application/json'],
        ]);

        try {
            $res = $http->request('GET', env('ELASTICSEARCH_HOST', '').$index.'/_doc/'.$id);
        } catch (ClientException $th) {
            abort($th->getCode(), $th->getMessage());
        }

        return $res;
    }
}