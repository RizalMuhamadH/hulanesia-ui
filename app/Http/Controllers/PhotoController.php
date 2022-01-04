<?php

namespace App\Http\Controllers;

use App\Repository\Elasticsearch;
use Carbon\Carbon;
use Illuminate\Http\Request;
use MeiliSearch\Client;

class PhotoController extends Controller
{
    private $repository;

    public function __construct(Elasticsearch $repository)
    {
        $this->repository = $repository;
    }
    
    public function index()
    {

        $recent = $this->repository->get('photo',[
            'from'      => 0,
            'size'      => 20,
            '_source'   => ['id', 'title', 'slug', 'images.media.original', 'created_at'],
            'sort'      => [
                [
                    'created_at' => [
                        'order' => 'desc'
                    ]
                ]
            ]
        ]);


        // $popular =$client->index('post-popular')->search('', ['limit' => 5, 'filters' => 'period = '.Carbon::now()->format('mY'), 'attributesToRetrieve' => [
        //     'id',
        //     'title',
        //     'slug',
        //     'description',
        //     'feature_id',
        //     'category_id',
        //     'category_name',
        //     'user_id',
        //     'user',
        //     'status',
        //     'image',
        //     'created_at',
        //     'timestamp'
        // ]])->getRaw();

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

        return view('photo', ['recent' => parse_json($recent), 'menu' => parse_json($menu)]);
    }

    public function detail($id, $date, $slug)
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $data = $client->index('photo')->search('', ['filters' => 'id = '.$id])->getRaw();

        abort_if(count($data['hits']) == 0, 404);

        $photo = $data['hits'][0];

        $recent = $client->index('photo')->search('', ['limit' => 12, 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'user_id',
            'user_name',
            'image',
            'created_at',
            'timestamp'
        ]])->getRaw();

        $menu = $client->index('category')->search('', ['filters' => 'order > 0'])->getRaw();

        return view('detail-photo', compact(['photo', 'recent', 'menu']));
    }
}
