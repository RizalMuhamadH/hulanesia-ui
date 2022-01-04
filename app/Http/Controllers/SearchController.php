<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class SearchController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }
    
    public function index(Request $request)
    {
        
        $word = $request->search;

        $posts = $this->repository->get('article', [
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
                'bool' => [
                    'must' => [
                        [
                            'match' => [
                                'status' => 'PUBLISH'
                            ]
                        ],
                        [
                            'query_string' => [
                                'query' => $word,
                                'fields' => ['title']
                            ],
                        ]
                    ]

                ]
            ]
        ]);

        $posts = parse_json($posts);

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

        // return $posts;


        $pagination = $this->paginate($posts['total']['value'], $this->size);

        return view('search', ['posts' => $posts, 'menu' => parse_json($menu), 'search' => $word, 'pagination' => $pagination]);
    }
}
