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

        $headline = $this->repository->get('article',[
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

        $editor_choice = $this->repository->get('article',[
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

        $recent = $this->repository->get('article',[
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

        $recent = array_chunk(parse_json($recent)['hits'], 10);

        $photos = $this->repository->get('photo',[
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

        $menu = $this->repository->get('category',[
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

        // // $mostPopular = Analytics::fetchMostVisitedPages(Period::days(7), 10);

        return view('home', [
            'recent' => $recent,
            'headline' => parse_json($headline),
            'editorChoice' => parse_json($editor_choice),
            'menu' => parse_json($menu),
            'photos' => parse_json($photos)
        ]);

        // return view('index')->with([]);

        // return view('index', compact(['recent', 'headline', 'breakingNews', 'umum', 'wisata', 'lifestyle']));
    }
}
