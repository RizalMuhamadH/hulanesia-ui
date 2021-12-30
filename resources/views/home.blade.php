<x-layouts.app>
    @push('title')
        <title>Wehealth</title>
    @endpush
    @push('head')
        <meta name="description" content="Wehealth">
        <meta name="keywords" content="{{ env('META_KEYWORD') }}">
        <meta name="author" content="wehealth">
        <meta property="og:title" content="Wehealth">
        <meta property="og:description" content="wehealth">
        <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
        <meta property="og:site_name" content="Wehealth">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto my-8">
            <div class="flex flex-wrap">
                <div class="lg:w-2/3 w-full flex flex-col space-y-10">
                    <x-headline :headline="$headline"></x-headline>
                    <x-editor-choice :posts="$editorChoice"></x-editor-choice>
                    <x-recent-news :posts="$recent[0]" :name="'Most Recent'"></x-recent-news>
                    
                </div>
                <div class="lg:w-1/3 w-full px-4">
                    {{-- <x-popular-news :posts="$popular"></x-popular-news> --}}
                    <!-- popular-wrapper -->
                </div>

                <x-recent-photo :photos="$photos"></x-recent-photo>
                {{-- <x-breaking-news :posts="$editorChoice" :name="'Editor Choice'"></x-breaking-news> --}}
            </div>
        </div>
        <div class="container mx-auto">

            <div class="flex flex-wrap">

                <div class="lg:w-2/3 w-full">
                    @if (isset($recent[1]))
                    <x-recent-news :posts="$recent[1]" :name="'Most Recent'"></x-recent-news>
                    @endif
                </div>


                <div class="lg:w-1/3 w-full px-4">
                    {{-- <x-popular-news :posts="$popular"></x-popular-news> --}}
                    <!-- popular-wrapper -->
                </div>

            </div>

            {{-- @foreach ($categories as $item)
                @if (count($item['data']) == 4)
                    <x-category-news :posts="$item['data']" :name="$item['name']"></x-category-news>
                @else
                    <x-collection-news :posts="$item['data']" :name="$item['name']"></x-collection-news>
                @endif
            @endforeach --}}

            {{-- <x-category-news :posts="$news_sains" :name="'News dan Sains'"></x-category-news>

            <x-collection-news :posts="$gadget" :name="'Gadget'"></x-collection-news>

            <x-category-news :posts="$hobby" :name="'Hobby'"></x-category-news>

            <x-collection-news :posts="$olahraga" :name="'Olahraga'"></x-collection-news>

            <x-category-news :posts="$traveling" :name="'Traveling'"></x-category-news>

            <x-collection-news :posts="$gaya_hidup" :name="'Gaya hidup'"></x-collection-news>

            <x-category-news :posts="$otomotif" :name="'Otomotif'"></x-category-news> --}}
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
