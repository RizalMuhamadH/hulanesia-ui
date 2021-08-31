<?php

namespace App\View\Components;

use Illuminate\View\Component;

class CollectionPhoto extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $photos;
    public $name;
    public function __construct($photos, $name)
    {
        $this->photos = $photos;
        $this->name = $name;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.collection-photo');
    }
}
