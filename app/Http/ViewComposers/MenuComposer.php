<?php
namespace App\Http\ViewComposers;

use App\Services\Menu;
use Illuminate\View\View;
class MenuComposer
{
    private $menu;
    public function __construct(Menu $menu)
    {
        $this->menu = $menu;
    }
    public function compose(View $view)
    {
        $view->with('menu', $this->menu->get());
    }
}