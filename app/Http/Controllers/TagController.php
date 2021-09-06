<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class TagController extends Controller
{
    public function index($slug)
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $headline = $client->index('post')->search('', ['limit' => 5, 'filters' => 'feature_id = 1 AND status = PUBLISH AND tags_slug = '.$slug, 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'description',
            'feature_id',
            'category_id',
            'category_name',
            'user_id',
            'user',
            'status',
            'image',
            'created_at',
            'timestamp'
        ]])->getRaw();

        $posts = $client->index('post')->search('', ['limit' => 20, 'filters' => 'status = PUBLISH AND tags_slug = '.$slug, 'attributesToRetrieve' => [
            'id',
            'title',
            'slug',
            'description',
            'feature_id',
            'category_id',
            'category_name',
            'user_id',
            'user',
            'status',
            'image',
            'created_at',
            'timestamp'
        ]])->getRaw();

        
        $data = $client->index('tag')->search('', ['filters' => 'slug = '.$slug])->getRaw();

        abort_if(count($data['hits']) == 0, 404);

        $tag = $data['hits'][0];

        $menu = $client->index('category')->search('', ['filters' => 'order > 0'])->getRaw();

        return view('tag', compact(['headline' ,'tag', 'posts', 'menu']));
    }
}
