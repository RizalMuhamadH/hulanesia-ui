<x-layouts.app>
    @push('title')
        <title>{{ $photo['_source']['title'] }}</title>
    @endpush

    @push('head')
        <meta name="description" content="{{ $photo['_source']['description'] }}">
        <meta name="keywords" content="{{ env('META_KEYWORD') }}">
        <meta name="author" content="{{ $photo['_source']['editor']['name'] }}">
        <meta property="og:title" content="{{ $photo['_source']['title'] }}">
        <meta property="og:description" content="{{ $photo['_source']['description'] }}">
        <meta property="og:image" content="{{ env('STORAGE') }}storage/{{ $photo['_source']['images'][0]['media']['medium'] }}">
        <meta property="og:site_name" content="{{ $photo['_source']['title'] }}">
    @endpush

    @push('style')
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0.0-beta.4/dist/fancybox.css">
    @endpush

    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">
        <div class="container mx-auto my-8">
            <div class="flex flex-wrap">
                <div class="lg:w-2/3 w-full flex flex-col space-y-10">
                    <x-photo-title-image :photo="$photo" />
                    <div>
                        <x-photo-description :photo="$photo"></x-photo-description>
                        <x-collection-photo :name="'Photo Lainnya'" :photos="$recent['hits']"></x-collection-photo>
                    </div>
                </div>
                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>
            </div>
        </div>
    </x-slot>
    @push('script')
    <script type="module">
        import { Fancybox } from "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0.0-beta.4/dist/fancybox.esm.js";

        Fancybox.bind(".gallery a", {
        });

    </script>
    @endpush
</x-layouts.app>
