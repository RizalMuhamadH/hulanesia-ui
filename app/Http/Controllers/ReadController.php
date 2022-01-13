<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Cache;
use MeiliSearch\Client;
use Illuminate\Support\Str;

class ReadController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request, $category, $id, $date, $slug)
    {
        $post = Cache::remember('article_'.$id, 1200, function() use($id) {
            $res = $this->repository->doc('article', $id);

            return parse_json($res);

        });

        $max_paragraf = 2;

        $content = read_content($post['_source']['body'], $max_paragraf, $request->page ?? 1);

        $keyword = collect($post['_source']['tags'])->implode('name', ' OR ');

        $related = Cache::remember('related_'.str_replace('_', ' ', str_replace('_', ' OR ', $keyword)), 300, function () use($post, $keyword) {
            $res = $this->repository->get('article', [
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
                        'must_not' => [
                            'match' => [
                                'id' => $post['_source']['id']
                            ]
                        ],
                        'must' => [
                            [
                                'match' => [
                                    'status' => 'PUBLISH'
                                ]
                            ],
                            [
                                'query_string' => [
                                    'query' => '(' . $keyword . ')',
                                    'fields' => ['title']
                                ],
                            ]
                        ]
    
                    ]
                ]
            ]);

            return parse_json($res);
            
        });


        return view('read', ['post' => $post, 'content' => $content, 'related' => $related, 'pagination' => read_pagination($post['_source']['body'], $request->page ?? 1, $max_paragraf)]);
    }
}
