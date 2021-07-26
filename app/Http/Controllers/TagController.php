<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function index(Tag $tag)
    {
        $posts = $tag->posts()->where('status', 'PUBLISH')->orderBy('created_at', 'DESC')->with(['category', 'image'])->paginate(15);

        return $posts;
    }
}
