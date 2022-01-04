<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
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
        $post = '';
        try {
            $post = $this->repository->doc('article', $id);
        } catch (\Throwable $th) {
            abort($th->getCode());
        }

        $post = parse_json($post);

        $max_paragraf = 2;

        $content = read_content($post['_source']['body'], $max_paragraf, $request->page ?? 1);

        $keyword = collect($post['_source']['tags'])->implode('name', ' OR ');

        $related = $this->repository->get('article', [
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

        return view('read', ['post' => $post, 'content' => $content, 'related' => parse_json($related), 'menu' => parse_json($menu), 'pagination' => read_pagination($post['_source']['body'], $request->page ?? 1, $max_paragraf)]);
    }
}
