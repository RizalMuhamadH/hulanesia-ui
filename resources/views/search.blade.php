<x-layouts.app>
    @push('title')
    <title>Search {{ $search }}</title>
    @endpush
    @push('head')
    <meta name="description" content="Search">
    <meta name="keywords" content="{{ env('META_KEYWORD') }}">
    <meta name="author" content="Wehealth">
    <meta property="og:title" content="Search {{ $search }}">
    <meta property="og:description" content="Search">
    <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
    <meta property="og:site_name" content="Search">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto">
    
            <div class="flex flex-wrap mt-10">
    
                <div class="lg:w-2/3 w-full">
                    <x-recent-news :posts="$posts['hits']" :name="'Search &#34;'.$search.'&#34;'"></x-recent-news>

                    {{ $pagination->links('vendor.pagination.custom') }}
                </div>
    
                <div class="lg:w-1/3 w-full px-4">
                    {{-- <x-popular-news :posts="$popular"></x-popular-news> --}}
                    <!-- popular-wrapper -->
                </div>
    
            </div>
        </div>
    </x-slot>
</x-layouts.app>
