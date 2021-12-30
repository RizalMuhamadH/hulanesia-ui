<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class CategoryController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }

    public function index($slug)
    {
        $headline = $this->repository->get('article', [
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
                ],
                'match' => [
                    'category.slug' => $slug
                ]
            ]
        ]);

        $recent = $this->repository->get('article', [
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
                ],
                'match' => [
                    'category.slug' => $slug
                ]
            ]
        ]);

        $menu = $this->repository->get('category', [
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

        $cat = $this->repository->get('category', [
            'query'     => [
                'match' => [
                    'slug' => $slug
                ]
            ]
        ]);


        $category = parse_json($cat);

        abort_if(count($category['hits']) == 0, 404);


        return view('category', [
            'headline'      => parse_json($headline),
            'category'      => $category['hits'][0],
            'recent'        => parse_json($recent),
            'menu'          => parse_json($menu)
        ]);
    }
}
