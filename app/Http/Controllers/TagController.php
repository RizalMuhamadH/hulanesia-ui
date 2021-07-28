<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;

class TagController extends Controller
{
    public function index(Tag $tag)
    {
        $posts = $tag->posts()->where('status', 'PUBLISH')->orderBy('created_at', 'DESC')->with(['category', 'image'])->paginate(15);
        
        $post = new Post();
        $popular = $post->publish()->orderByViews('desc', Period::pastDays(7))->take(5)->get();

        $menu = Category::where('order', '<>', 0)->orderBy('order', 'ASC')->get();

        return view('tag', compact(['tag', 'posts', 'popular', 'menu']));
    }
}
