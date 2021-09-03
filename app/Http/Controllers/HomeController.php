<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PostsResource;
use Carbon\Carbon;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Collection;
use MeiliSearch\Client;
use Spatie\Analytics\Analytics;
use Spatie\Analytics\Period;

class HomeController extends Controller
{
    public function index()
    {
        $client = new Client('http://127.0.0.1:7700', 'wehealth.id');

        $headline = $client->index('post')->search('', ['limit' => 5, 'filters' => 'feature_id = 1 AND status = PUBLISH', 'attributesToRetrieve' => [
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

        $editor_choice = $client->index('post')->search('', ['limit' => 5, 'filters' => 'feature_id = 2 AND status = PUBLISH', 'attributesToRetrieve' => [
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

        $recent = $client->index('post')->search('', ['limit' => 20, 'filters' => 'status = PUBLISH', 'attributesToRetrieve' => [
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

        $mostPopular = Analytics::fetchMostVisitedPages(Period::days(7), 10);

        return view('index', [
            'recent' => $recent,
            'headline' => $headline,
            'editorChoice' => $editor_choice,
            'popular' => $popular,
            'menu' => $menu
        ]);

        // return view('index')->with([]);

        // return view('index', compact(['recent', 'headline', 'breakingNews', 'umum', 'wisata', 'lifestyle']));
    }

}
