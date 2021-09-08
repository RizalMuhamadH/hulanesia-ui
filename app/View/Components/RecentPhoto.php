<?php

namespace App\View\Components;

use Illuminate\View\Component;

class RecentPhoto extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $photos = [];
    public function __construct($photos)
    {
        $this->photos = $photos;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.recent-photo');
    }
}
