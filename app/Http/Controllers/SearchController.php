<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use CyrildeWit\EloquentViewable\Support\Period;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $word = $request->word;

        $post = new Post();
        $posts = Post::search($word)->orderBy('created_at', 'DESC')->take(20)->get();
        
        $popular = $post->publish()->orderByViews('desc', Period::pastDays(7))->take(5)->get();
        
        $menu = Category::where('order', '<>', 0)->orderBy('order', 'ASC')->get();

        // return $posts;

        return view('search', compact(['posts', 'menu', 'popular', 'word']));
    }
}
