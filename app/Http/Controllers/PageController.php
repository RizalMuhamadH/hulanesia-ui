<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Setting;
use CyrildeWit\EloquentViewable\Support\Period;

class PageController extends Controller
{
    public function index(Setting $setting)
    {
        $post = new Post();
        $menu = Category::where('order', '<>', 0)->orderBy('order', 'ASC')->get();

        return view('page', compact(['setting', 'menu']));
    }
}
