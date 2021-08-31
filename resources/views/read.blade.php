<x-layouts.app>
    @push('title')
        <title>{{ $post['title'] }}</title>
    @endpush
    
    @push('head')
    <meta name="description" content="{{ $post['meta_description'] ?? $post['description'] }}">
    <meta name="keywords" content="{{ $post['meta_keywords'] ?? env('META_KEYWORD') }}">
    <meta name="author" content="{{ $post['user'] }}">
    <meta property="og:title" content="{{ $post['title'] }}">
    <meta property="og:description" content="{{ $post['meta_description'] ?? $post['description'] }}">
    <meta property="og:image" content="{{ url('/') }}/storage/{{ $post['image']['media']['medium'] }}">
    <meta property="og:site_name" content="{{ $post['title'] }}">
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
                        <x-read-body :post="$post"></x-read-body>
                        <x-recent-news :posts="$related" :name="'Artikel Lainnya'"></x-recent-news>
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
