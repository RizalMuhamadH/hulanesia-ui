<?php

namespace App\Http\Controllers;

use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use MeiliSearch\Client;

class PhotoController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {

        $recent = Cache::remember('photo_recent', 300, function () {
            $res = $this->repository->get('photo', [
                'from'      => 0,
                'size'      => 20,
                '_source'   => ['id', 'title', 'slug', 'images.media.original', 'created_at'],
                'sort'      => [
                    [
                        'created_at' => [
                            'order' => 'desc'
                        ]
                    ]
                ]
            ]);

            return parse_json($res);
            
        });


        return view('photo', ['recent' => $recent]);
    }

    public function detail($id, $date, $slug)
    {
        $photo = Cache::remember('photo_'.$id, 1200, function() use($id) {
            $res = $this->repository->doc('photo', $id);

            return parse_json($res);

        });

        $recent = Cache::remember('photo_recent', 300, function () {
            $res = $this->repository->get('photo', [
                'from'      => 0,
                'size'      => 20,
                '_source'   => ['id', 'title', 'slug', 'images.media.original', 'created_at'],
                'sort'      => [
                    [
                        'created_at' => [
                            'order' => 'desc'
                        ]
                    ]
                ]
            ]);

            return parse_json($res);
            
        });

        return view('detail-photo', ['photo' => $photo, 'recent' => $recent]);
    }
}
