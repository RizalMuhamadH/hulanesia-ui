<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use CyrildeWit\EloquentViewable\Support\Period;
use Illuminate\Support\Facades\Cache;
use MeiliSearch\Client;

class SearchController extends Controller
{
    private $repository;
    private $size = 20;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }
    
    public function index(Request $request)
    {
        
        $word = $request->search;
        $size = $this->size;

        $posts = Cache::remember('search_'.$word, 600, function() use($word, $size) {
            $res = $this->repository->get('article', [
                'from'      => 0,
                'size'      => $size,
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

            return parse_json($res);
        });

        // return $posts;


        $pagination = $this->paginate($posts['total']['value'], $this->size);

        return view('search', ['posts' => $posts, 'search' => $word, 'pagination' => $pagination]);
    }
}
