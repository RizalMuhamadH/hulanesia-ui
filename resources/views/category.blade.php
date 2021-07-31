<x-layouts.app>
    @push('title')
    <title>Wehealth - {{ $category->name }}</title>
    @endpush
    @push('head')
    <meta name="description" content="{{ $category->name }}">
    <meta name="keywords" content="{{ env('META_KEYWORD') }}">
    <meta name="author" content="hulanesia">
    <meta property="og:title" content="{{ $category->name }}">
    <meta property="og:description" content="{{ $category->name }}">
    <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
    <meta property="og:site_name" content="{{ $category->name }}">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto my-8">
            <div class="flex flex-wrap">
                <x-header-category :posts="$headline" :name="$category->name"></x-header-category>
            </div>
        </div>
        <div class="container mx-auto">
    
            <div class="flex flex-wrap">
    
                <div class="lg:w-2/3 w-full">
                    <x-recent-news :posts="$categories" :name="''"></x-recent-news>

                    {{ $categories->links('vendor.pagination.custom') }}
                </div>
    
                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>
    
            </div>
        </div>
    </x-slot>
</x-layouts.app>
