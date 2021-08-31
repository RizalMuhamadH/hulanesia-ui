<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class ReadController extends Controller
{
    public function index($id, $date, $slug)
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $data = $client->index('post')->search('', ['filters' => 'status = PUBLISH AND id = '.$id])->getRaw();

        abort_if(count($data['hits']) == 0, 404);

        $post = $data['hits'][0];

        $filter = '';

        foreach ($post['tags_slug'] as $key => $item) {
            if($key == 0) {
                if(count($post['tags_slug']) == 1)
                $filter = 'AND tags_slug = '.$item;
                else
                $filter = 'AND (tags_slug = '.$item;
            } else if((count($post['tags_slug']) - 1) == $key){ 
                $filter = $filter.' OR tags_slug = '.$item.')';
            } else {
                $filter = $filter.' OR tags_slug = '.$item;
            }

        }

        $related = $client->index('post')->search('', ['limit' => 20, 'filters' => 'status = PUBLISH '.$filter, 'attributesToRetrieve' => [
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

        $popular =$client->index('post-popular')->search('', ['limit' => 5, 'filters' => 'period = '.Carbon::now()->format('mY'), 'attributesToRetrieve' => [
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

        $menu = $client->index('category')->search('', ['filters' => 'order > 0'])->getRaw();

        return view('read', compact(['post', 'related', 'popular', 'menu']));
    }
}
