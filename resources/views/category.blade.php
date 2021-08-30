<x-layouts.app>
    @push('title')
        <title>Wehealth - {{ $category['name'] }}</title>
    @endpush
    @push('head')
        <meta name="description" content="{{ $category['name'] }}">
        <meta name="keywords" content="{{ env('META_KEYWORD') }}">
        <meta name="author" content="hulanesia">
        <meta property="og:title" content="{{ $category['name'] }}">
        <meta property="og:description" content="{{ $category['name'] }}">
        <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
        <meta property="og:site_name" content="{{ $category['name'] }}">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto my-8">
            <div class="flex flex-wrap">
                <div class="lg:w-2/3 w-full flex flex-col space-y-10">
                    <x-headline :headline="$headline"></x-headline>
                    <div>
                        <x-recent-news :posts="$recent" :name="$category['name']"></x-recent-news>
                        <livewire:loadmore :initCount="count($recent['hits'])" :scaffold="'category'" :slug="$category['slug']"/>
                    </div>
                </div>
                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>
            </div>
        </div>

        @push('script')
            @if (!Agent::isMobile())
                <script src="{{ mix('js/flicking/flicking.js') }}"></script>
            @else
                <script src="{{ mix('js/flicking/flicking-mobile.js') }}"></script>
            @endif
        @endpush
    </x-slot>
</x-layouts.app>
