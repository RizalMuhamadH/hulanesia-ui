<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use CyrildeWit\EloquentViewable\Support\Period;

class CategoryController extends Controller
{
    public function index(Category $category)
    {
        // dd($category);
        $post = new Post();
        $headline = $post->publish()->with(['category', 'image'])->where([
            ['feature_id', 1],
            ['category_id', $category->id]
            ])->take(5)->get();
        $categories = $post->publish()->with(['category', 'image'])->where('category_id', $category->id)->paginate(15);

        $popular = $post->publish()->orderByViews('desc', Period::pastDays(7))->take(5)->get();
        
        $menu = Category::where('order', '<>', 0)->orderBy('order', 'ASC')->get();

        return view('category', compact(['headline', 'categories', 'popular', 'category', 'menu']));
    }
}
