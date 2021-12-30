<?php

namespace App\Repository;

use Elasticsearch\ClientBuilder;
use GuzzleHttp\Client;

class Elasticsearch {
    public function get($index, $params)
    {
        $http = new Client([
            'headers'   => ['Content-Type' => 'application/json'],
        ]);

        return $http->request('GET', env('ELASTICSEARCH_HOST', '').$index.'/_search', [
            'body' => json_encode($params)
        ]);
    }

    public function doc($index, $id)
    {
        $http = new Client([
            'headers'   => ['Content-Type' => 'application/json'],
        ]);

        return $http->request('GET', env('ELASTICSEARCH_HOST', '').$index.'/_doc/'.$id);
    }
}