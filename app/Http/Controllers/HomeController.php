<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PostsResource;
use CyrildeWit\EloquentViewable\Support\Period;
use Illuminate\Support\Collection;

class HomeController extends Controller
{
    public function index()
    {
        $post = new Post();
        $headline = $post->publish()->with(['category', 'image'])->where('feature_id', 1)->take(5)->get();
        $editor_choice = $post->publish()->with(['category', 'image'])->where('feature_id', 2)->take(5)->get();
        $recent = new PostsResource($post->publish()->with(['category', 'image'])->take(10)->get());
        $news_sains = $post->publish()->with(['category', 'image'])->where('category_id', 1)->take(4)->get();
        $makanan = $post->publish()->with(['category', 'image'])->where('category_id', 2)->take(10)->get();
        $diet = $post->publish()->with(['category', 'image'])->where('category_id', 3)->take(4)->get();
        $herbal = $post->publish()->with(['category', 'image'])->where('category_id', 4)->take(10)->get();
        $tips = $post->publish()->with(['category', 'image'])->where('category_id', 5)->take(4)->get();
        $olahraga = $post->publish()->with(['category', 'image'])->where('category_id', 6)->take(10)->get();
        $umum = $post->publish()->with(['category', 'image'])->where('category_id', 7)->take(4)->get();
        $popular = $post->publish()->orderByViews('desc', Period::pastDays(7))->take(5)->get();
        $menu = Category::where('order', '<>', 0)->orderBy('order', 'ASC')->get();

        $categories = new collection([

            [
                'data' => $news_sains,
                'name' => 'News dan Sains'
            ],
            [
                'data' => $makanan,
                'name' => 'Makanan'
            ],
            [
                'data' => $diet,
                'name' => 'Diet'
            ],
            [
                'data' => $herbal,
                'name' => 'Herbal'
            ],
            [
                'data' => $tips,
                'name' => 'Tips'
            ],
            [
                'data' => $olahraga,
                'name' => 'Olahraga'
            ],
            [
                'data' => $umum,
                'name' => 'Umum'
            ]
        ]);
        // dd(json_encode($recent->toJson(), TRUE));
        // return $recent->toJson();

        return view('index', [
            'recent' => $recent,
            'headline' => $headline,
            'editorChoice' => $editor_choice,
            'categories' => $categories,
            'popular' => $popular,
            'menu' => $menu
        ]);

        // return view('index')->with([]);

        // return view('index', compact(['recent', 'headline', 'breakingNews', 'umum', 'wisata', 'lifestyle']));
    }
}
