<?php

namespace App\View\Components;

use Illuminate\View\Component;

class CategoryNews extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $posts;
    public $name;
    public function __construct($posts, $name)
    {
        $this->posts = $posts;
        $this->name = $name;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.category-news');
    }
}
