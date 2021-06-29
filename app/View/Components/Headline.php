<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Headline extends Component
{
    public $headline = [];
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($headline)
    {
        $this->headline = $headline;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.headline');
    }
}
