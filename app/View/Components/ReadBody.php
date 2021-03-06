<?php

namespace App\View\Components;

use Illuminate\View\Component;

class ReadBody extends Component
{
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public $post;
    public $content;
    public $pagination;
    public function __construct($post, $content, $pagination = '')
    {
        $this->post = $post;
        $this->content = $content;
        $this->pagination = $pagination;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.read-body');
    }
}
