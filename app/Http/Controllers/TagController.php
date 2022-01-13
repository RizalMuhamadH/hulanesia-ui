<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use App\Models\Category;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use Illuminate\Support\Facades\Cache;
use MeiliSearch\Client;

class TagController extends Controller
{
    private $repository;
    private $size = 20;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }
    
    public function index($slug)
    {
        $size = $this->size;
        $headline = Cache::remember('headline_tag_'.$slug, 600, function () use($slug, $size) {
            $res = $this->repository->get('article',[
                'from'      => 0,
                'size'      => $size,
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

            return parse_json($res);
            
        });

        $recent = Cache::remember('recent_tag_'.$slug, 300, function () use($slug) {
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

            return parse_json($res);
            
        });

        
        $tag = Cache::remember('tag_'.$slug, 300, function () use($slug) {
            $res = $this->repository->get('tag', [
                'query'     => [
                    'match' => [
                        'slug' => $slug
                    ]
                ]
            ]);

            return parse_json($res);
            
        });


        abort_if(count($tag['hits']) == 0, 404);

        $pagination = $this->paginate($recent['total']['value'], $this->size);

        return view('tag', ['headline' => $headline ,'tag' => $tag['hits'][0], 'posts' => $recent, "pagination" => $pagination]);
    }
}
