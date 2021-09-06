<?php

namespace App\Providers;

use App\Http\ViewComposers\PopularityComposer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Using class based composers...
        View::composer(
            ['index', 'category', 'detail-photo', 'page', 'photo', 'read', 'search', 'tag'], PopularityComposer::class
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