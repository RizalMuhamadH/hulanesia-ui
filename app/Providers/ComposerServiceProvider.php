<?php

namespace App\Providers;

use App\Http\ViewComposers\MenuComposer;
use App\Http\ViewComposers\PopularityComposer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Using class based composers...
        View::composer(
            ['*'], PopularityComposer::class
        );
        View::composer(
            ['*'], MenuComposer::class
        );
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}