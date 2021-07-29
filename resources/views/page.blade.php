<x-layouts.app>
    @push('title')
        <title>Hulanesia - {{ $setting->name }}</title>
    @endpush
    @push('head')
    <meta name="description" content="{{ $setting->meta_description ?? $setting->name }}">
    <meta name="keywords" content="{{ env('META_KEYWORD') }}">
    <meta name="author" content="hulanesia">
    <meta property="og:title" content="{{ $setting->name }}">
    <meta property="og:description" content="{{ $setting->meta_description ?? $setting->name }}">
    <meta property="og:image" content="{{ Request::url() }}/favicon.ico">
    <meta property="og:site_name" content="{{ $setting->name }}">
    @endpush
    <x-slot name="nav">
        <x-navbar :menu="$menu"></x-navbar>
    </x-slot>
    <x-slot name="content">

        <div class="container mx-auto">

            <div class="flex flex-wrap mt-10">

                <div class="lg:w-2/3 w-full">
                    <x-page-body :page="$setting"></x-page-body>
                </div>


                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>

            </div>
        </div>
    </x-slot>
</x-layouts.app>