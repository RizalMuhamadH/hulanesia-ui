<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Category $category)
    {
        $post = new Post();
        $headline = $post->publish()->with(['category', 'image'])->where([
            ['feature_id', 1],
            ['category_id', $category->id]
            ])->take(5)->get();
        $categories = $post->publish()->with(['category', 'image'])->paginate(15);
        return view('category', [$headline, $categories]);
    }
}
