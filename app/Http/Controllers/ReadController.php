<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;

class ReadController extends Controller
{
    public function index(Post $post, $date, $slug)
    {
        views($post)->record();
        $related = Post::with(['category', 'image'])->whereHas('tags', function ($query) use($post) {
            return $query->whereIn('id', $post->tags->pluck('id'));
        })->where('id', '<>', $post->id)->where('status', 'PUBLISH')->orderBy('created_at', 'DESC')->take(5)->get();
        
        $popular = $post->publish()->orderByViews('desc', Period::pastDays(7))->take(5)->get();

        return view('read', compact(['post', 'related', 'popular']));
    }
}
