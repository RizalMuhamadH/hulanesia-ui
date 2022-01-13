<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Repository\Elasticsearch;
use CyrildeWit\EloquentViewable\Support\Period;
use Illuminate\Support\Facades\Cache;

class PageController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }

    public function index($slug)
    {
        $setting = Cache::remember('page_'.$slug, 1200, function() use($slug) {
            $res = $this->repository->get('setting', [
                'query'     => [
                    'match' => [
                        'slug' => $slug
                    ]
                ]
            ]);

            return parse_json($res);

        });

        abort_if(count($setting['hits']) == 0, 404);

        return view('page', [
            'setting' => $setting['hits'][0],
        ]);
    }
}
