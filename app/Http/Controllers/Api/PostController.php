<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use MeiliSearch\Client;

class PostController extends Controller
{
    public function getHeadline($limit)
    {

        $client = new Client('http://18.138.34.108', 'wehealth.id');
        return $client->index('Post')->search('jaga')->getRaw();
        // $swoole = Cache::store('octane')->remember('headline', 100, function () use ($limit){
        //     return Str::random(10);
        //     // return json_decode(Post::publish()->with(['category', 'image'])->take($limit)->get(), true);
        // });

        // return $swoole;
        // return Post::publish()->with(['category', 'image'])->take($limit)->get();
        // return Post::search('', function($data, $word, $options){
        //         return $data->search($word, ["filters"=>"feature_id = 1"]);
        //     })->orderBy('created_at', 'DESC')->take($limit)->get()->load(['category', 'image']);
    }
}
