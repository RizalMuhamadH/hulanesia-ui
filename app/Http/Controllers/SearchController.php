<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use Carbon\Carbon;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');
        
        $word = $request->word;

        $posts = $client->index('post')->search($word, ['limit' => 20, 'filters' => 'status = PUBLISH', 'attributesToRetrieve' => [
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

        // return $posts;

        return view('search', compact(['posts', 'menu', 'word']));
    }
}
