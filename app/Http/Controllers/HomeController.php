<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $post = new Post();
        $headline = $post->publish()->with(['category'])->where('feature_id', 1)->take(5)->get();
        $breakingNews = $post->publish()->with(['category'])->where('feature_id', 2)->take(5)->get();
        $recent = $post->publish()->with(['category'])->take(10)->get();
        $umum = $post->publish()->where('category_id', 1)->take(10)->get();
        $wisata = $post->publish()->where('category_id', 2)->take(10)->get();
        $lifestyle = $post->publish()->where('category_id', 3)->take(10)->get();
        // dd($breakingNews);

        return view('index', [
            'recent' => $recent,
            'headline' => $headline,
            'breakingNews' => $breakingNews,
            'umum' => $umum,
            'wisata' => $wisata,
            'lifestyle' => $lifestyle
        ]);
    }
}
