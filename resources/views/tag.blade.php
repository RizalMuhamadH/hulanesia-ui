<x-layouts.app>
    @push('title')
    <title>Wehealth - {{ $tag->name }}</title>
    @endpush    
    @push('head')
    <meta name="description" content="{{ $tag->name }}">
    <meta name="keywords" content="{{ env('META_KEYWORD') }}">
    <meta name="author" content="Wehealth">
    <meta property="og:title" content="{{ $tag->name }}">
    <meta property="og:description" content="{{ $tag->name }}">
    <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
    <meta property="og:site_name" content="{{ $tag->name }}">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto">
    
            <div class="flex flex-wrap mt-10">
    
                <div class="lg:w-2/3 w-full">
                    <x-recent-news :posts="$posts" :name="'#'.$tag->name"></x-recent-news>

                    {{ $posts->links('vendor.pagination.custom') }}
                </div>
    
                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>
    
            </div>
        </div>
    </x-slot>
</x-layouts.app>
