<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use App\Models\Category;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class TagController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }
    
    public function index($slug)
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
                'bool' => [
                    'must' => [
                        [
                            'match' => [
                                'feature.id' => 1
                            ],
                        ],
                        [
                            'match' => [
                                'status' => 'PUBLISH'
                            ]
                        ],
                        [
                            'match' => [
                                'tags.slug' => $slug
                            ]
                        ]
                    ]
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
                'bool' => [
                    'must' => [
                        [
                            'match' => [
                                'status' => 'PUBLISH'
                            ]
                        ],
                        [
                            'match' => [
                                'tags.slug' => $slug
                            ]
                        ]
                    ]
                ]
            ]
        ]);

        $recent = parse_json($recent);

        
        $tag = $this->repository->get('tag', [
            'query'     => [
                'match' => [
                    'slug' => $slug
                ]
            ]
        ]);


        $tag = parse_json($tag);

        abort_if(count($tag['hits']) == 0, 404);

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

        $pagination = $this->paginate($recent['total']['value'], $this->size);

        return view('tag', ['headline' => parse_json($headline) ,'tag' => $tag['hits'][0], 'posts' => $recent, 'menu' => parse_json($menu), "pagination" => $pagination]);
    }
}
