<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PostsResource;
use Carbon\Carbon;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Collection;
use MeiliSearch\Client;
use Analytics;
use App\Repository\Elasticsearch;
use Illuminate\Support\Facades\Cache;
use Spatie\Analytics\Period;

class HomeController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {

        $headline = Cache::remember('home_headline', 300, function(){
            $res = $this->repository->get('article',[
                'from'      => 0,
                'size'      => 5,
                '_source'   => ['id', 'title', 'slug', 'description', 'image.media.small', 'feature', 'category', 'author.name', 'published_at', 'created_at'],
                'sort'      => [
                    [
                        'id' => [
                            'order' => 'desc'
                        ]
                    ]
                ],
                'query'     => [
                    'match' => [
                        'feature.id' => 1
                    ],
                    'match' => [
                        'status' => 'PUBLISH'
                    ]
                ]
            ]);

            return parse_json($res);
        });


        $editor_choice = Cache::remember('editor_choice', 300, function () {
            $res = $this->repository->get('article',[
                'from'      => 0,
                'size'      => 5,
                '_source'   => ['id', 'title', 'slug', 'description', 'image.media.small', 'feature', 'category', 'author.name', 'published_at', 'created_at'],
                'sort'      => [
                    [
                        'id' => [
                            'order' => 'desc'
                        ]
                    ]
                ],
                'query'     => [
                    'match' => [
                        'feature.id' => 2
                    ],
                    'match' => [
                        'status' => 'PUBLISH'
                    ]
                ]
            ]);

            return parse_json($res);
            
        });


        $recent = Cache::remember('home_recent', 180, function () {
            $res = $this->repository->get('article',[
                'from'      => 0,
                'size'      => 20,
                '_source'   => ['id', 'title', 'slug', 'description', 'image.media.small', 'image.caption', 'feature', 'category', 'author.name', 'published_at', 'created_at'],
                'sort'      => [
                    [
                        'id' => [
                            'order' => 'desc'
                        ]
                    ]
                ],
                'query'     => [
                    'match' => [
                        'status' => 'PUBLISH'
                    ]
                ]
            ]);

            return parse_json($res);
            
        });
        

        $recent = array_chunk($recent['hits'], 10);

        $photos = Cache::remember('home_photo', 600, function () {
            $res = $this->repository->get('photo',[
                'from'      => 0,
                'size'      => 20,
                '_source'   => ['id', 'title', 'slug', 'images.media.original', 'image.caption', 'created_at'],
                'sort'      => [
                    [
                        'id' => [
                            'order' => 'desc'
                        ]
                    ]
                ],
            ]);

            return parse_json($res);
            
        });
        

        // // $mostPopular = Analytics::fetchMostVisitedPages(Period::days(7), 10);

        return view('home', [
            'recent' => $recent,
            'headline' => $headline,
            'editorChoice' => $editor_choice,
            'photos' => $photos
        ]);

        // return view('index')->with([]);

        // return view('index', compact(['recent', 'headline', 'breakingNews', 'umum', 'wisata', 'lifestyle']));
    }
}
