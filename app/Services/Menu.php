<?php

namespace App\Services;

use App\Repository\Elasticsearch;
use Illuminate\Support\Facades\Cache;

class Menu {

    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }

    public function get()
    {
        $menu = Cache::remember('menu', 1200, function(){
            $res = $this->repository->get('category', [
                'sort'      => [
                    [
                        'order' => [
                            'order' => 'asc'
                        ]
                    ]
                ],
                'query'     => [
                    'match' => [
                        'present' => 1
                    ]
                ]
            ]);

            return parse_json($res);

        });

        return $menu;
    }
}