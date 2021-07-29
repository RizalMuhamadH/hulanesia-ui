<x-layouts.app>
    @push('title')
        <title>{{ $post->title }}</title>
    @endpush
    
    @push('head')
    <meta name="description" content="{{ $post->meta_description ?? $post->description }}">
    <meta name="keywords" content="{{ $post->meta_keywords ?? env('META_KEYWORD') }}">
    <meta name="author" content="{{ $post->user->name }}">
    <meta property="og:title" content="{{ $post->name }}">
    <meta property="og:description" content="{{ $post->meta_description ?? $post->description }}">
    <meta property="og:image" content="{{ url('/') }}/storage/{{ $post->image->thumbnail('medium') }}">
    <meta property="og:site_name" content="{{ $post->title }}">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <x-read-title-image :post="$post"></x-read-title-image>

        <div class="container mx-auto">

            <div class="flex flex-wrap">

                <div class="lg:w-2/3 w-full">
                    <x-read-body :post="$post"></x-read-body>
                </div>


                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>

            </div>

            <div class="container mx-auto border-t border-gray-300"></div>

            <x-collection-news :posts="$related" :name="'Related'"></x-collection-news>

            {{-- <x-category-news></x-category-news> --}}
        </div>
    </x-slot>
</x-layouts.app>
