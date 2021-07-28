<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\PostsResource;
use CyrildeWit\EloquentViewable\Support\Period;

class HomeController extends Controller
{
    public function index()
    {
        $post = new Post();
        $headline = $post->publish()->with(['category', 'image'])->where('feature_id', 1)->take(5)->get();
        $breakingNews = $post->publish()->with(['category', 'image'])->where('feature_id', 2)->take(5)->get();
        $recent = new PostsResource($post->publish()->with(['category', 'image'])->take(10)->get());
        $kesehatan = $post->publish()->with(['category', 'image'])->where('category_id', 1)->take(4)->get();
        $gadget = $post->publish()->with(['category', 'image'])->where('category_id', 2)->take(10)->get();
        $hobby = $post->publish()->with(['category', 'image'])->where('category_id', 3)->take(4)->get();
        $olahraga = $post->publish()->with(['category', 'image'])->where('category_id', 4)->take(10)->get();
        $traveling = $post->publish()->with(['category', 'image'])->where('category_id', 5)->take(4)->get();
        $gaya_hidup = $post->publish()->with(['category', 'image'])->where('category_id', 6)->take(10)->get();
        $otomotif = $post->publish()->with(['category', 'image'])->where('category_id', 7)->take(4)->get();
        $popular = $post->publish()->orderByViews('desc', Period::pastDays(7))->take(5)->get();
        $menu = Category::where('order', '<>', 0)->orderBy('order', 'ASC')->get();
        // dd(json_encode($recent->toJson(), TRUE));
        // return $recent->toJson();

        return view('index', [
            'recent' => $recent,
            'headline' => $headline,
            'breakingNews' => $breakingNews,
            'kesehatan' => $kesehatan,
            'gadget' => $gadget,
            'hobby' => $hobby,
            'olahraga' => $olahraga,
            'traveling' => $traveling,
            'gaya_hidup' => $gaya_hidup,
            'otomotif' => $otomotif,
            'popular' => $popular,
            'menu' => $menu
        ]);

        // return view('index')->with([]);

        // return view('index', compact(['recent', 'headline', 'breakingNews', 'umum', 'wisata', 'lifestyle']));
    }
}
