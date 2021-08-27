<!DOCTYPE html>
<html lang="en">

<head>
    @stack('title')
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link href="{{ url('/') }}/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <link rel="canonical" href="{{ Request::url() }}">
    @stack('head')
    <meta property="og:type" content="article">
    <meta property="og:url" content="{{ Request::url() }}">

    <meta name="robots" content="index,follow">
    <meta name="googlebot-news" content="index,follow">
    <meta name="googlebot" content="index,follow">
    <meta name="language" content="id">
    <meta name="geo.country" content="id">
    <meta http-equiv="content-language" content="In-Id">
    <meta name="geo.placename" content="Indonesia">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/swiper/6.7.0/swiper-bundle.min.css') }}" rel="stylesheet" type="text/css">
    @stack('style')

    <script src="https://unpkg.com/@egjs/flicking@4.0.0-beta.4/dist/flicking.pkgd.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@egjs/flicking@4.0.0/dist/flicking.css">
    <link rel="stylesheet" href="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/arrow.min.css">
    {{-- <script type="module" src="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/plugins.min.js"></script>
    <link rel="stylesheet" href="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/flicking-plugins.css"> --}}

    <script src="{{ asset('js/swiper/6.7.0/swiper-bundle.min.js') }}"></script>
    {{-- <script defer src="https://unpkg.com/alpinejs@3.1.0/dist/cdn.min.js"></script> --}}
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer></script>
</head>

<body>
    <div id="app" class="font-poppins w-full">
        {{ $nav }}
        <div class="w-full md:grid flex md:grid-cols-12 grid-cols-none">
            <div class="w-full col-span-8 col-start-3">
                <editor-choice></editor-choice>
                {{ $content }}
            </div>
        </div>
        <x-footer></x-footer>
    </div>

    @stack('script')

</body>

</html>
