<x-layouts.app>
    @push('title')
        <title>{{ $post['_source']['title'] }}</title>
    @endpush
    
    @push('head')
    <meta name="description" content="{{ $post['_source']['meta_description'] ?? $post['_source']['description'] }}">
    <meta name="keywords" content="{{ $post['_source']['meta_keywords'] ?? env('META_KEYWORD') }}">
    <meta name="author" content="{{ $post['_source']['editor']['name'] ?? '' }}">
    <meta property="og:title" content="{{ $post['_source']['title'] }}">
    <meta property="og:description" content="{{ $post['_source']['meta_description'] ?? $post['_source']['description'] }}">
    <meta property="og:image" content="{{ env('STORAGE') }}/storage/{{ $post['_source']['image']['media']['medium'] }}">
    <meta property="og:site_name" content="{{ $post['_source']['title'] }}">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto my-8">
            <div class="flex flex-wrap">
                <div class="lg:w-2/3 w-full flex flex-col space-y-10">
                    <x-read-title-image :post="$post"></x-read-title-image>
                    <div>
                        <x-read-body :post="$post" :content="$content" :pagination="$pagination"></x-read-body>
                        <x-recent-news :posts="$related['hits']" :name="'Artikel Lainnya'"></x-recent-news>
                        {{-- <x-collection-news :posts="$related" :name="'Related'"></x-collection-news> --}}
                    </div>
                </div>
                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>
            </div>
        </div>
    </x-slot>
</x-layouts.app>
