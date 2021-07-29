<x-layouts.app>
    @push('title')
        <title>Hulanesia</title>
    @endpush
    @push('head')
    <meta name="description" content="Hulanesia">
    <meta name="keywords" content="{{ env('META_KEYWORD') }}">
    <meta name="author" content="hulanesia">
    <meta property="og:title" content="Hulanesia">
    <meta property="og:description" content="hulanesia">
    <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
    <meta property="og:site_name" content="Hulanesia">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto my-8">
            <div class="flex flex-wrap">
                <x-headline :headline="$headline"></x-headline>
                <x-breaking-news :posts="$breakingNews"></x-breaking-news>
            </div>
        </div>
        <div class="container mx-auto">

            <div class="flex flex-wrap">

                <div class="lg:w-2/3 w-full">
                    <x-recent-news :posts="$recent" :name="'Most Recent'"></x-recent-news>
                </div>


                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>

            </div>

            <x-category-news :posts="$kesehatan" :name="'Kesehatan'"></x-category-news>

            <x-collection-news :posts="$gadget" :name="'Gadget'"></x-collection-news>

            <x-category-news :posts="$hobby" :name="'Hobby'"></x-category-news>

            <x-collection-news :posts="$olahraga" :name="'Olahraga'"></x-collection-news>

            <x-category-news :posts="$traveling" :name="'Traveling'"></x-category-news>

            <x-collection-news :posts="$gaya_hidup" :name="'Gaya hidup'"></x-collection-news>

            <x-category-news :posts="$otomotif" :name="'Otomotif'"></x-category-news>
        </div>
    </x-slot>
</x-layouts.app>
