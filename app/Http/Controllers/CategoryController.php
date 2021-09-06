<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;
use MeiliSearch\Client;

class CategoryController extends Controller
{
    public function index($slug)
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $headline = $client->index('post')->search('', ['limit' => 5, 'filters' => 'feature_id = 1 AND status = PUBLISH AND category_slug = '.$slug, 'attributesToRetrieve' => [
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

        $recent = $client->index('post')->search('', ['limit' => 20, 'filters' => 'status = PUBLISH AND category_slug = '.$slug, 'attributesToRetrieve' => [
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

        $cat = $client->index('category')->search('', ['filters' => 'slug = '.$slug])->getRaw();

        abort_if(count($cat['hits']) == 0, 404);

        $category = $cat['hits'][0];

        return view('category', compact(['headline', 'recent', 'category', 'menu']));
    }
}
