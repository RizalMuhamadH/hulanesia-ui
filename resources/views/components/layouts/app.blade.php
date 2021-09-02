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

    
    @livewireStyles
    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
    @stack('style')

    <style>
        html {
            scroll-behavior: smooth;    
        }
    </style>

    <script src="https://unpkg.com/@egjs/flicking@4.0.0-beta.4/dist/flicking.pkgd.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@egjs/flicking@4.0.0/dist/flicking.css">
    <link rel="stylesheet" href="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/arrow.min.css">
    <link rel="stylesheet" href="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/pagination.min.css">
    {{-- <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer></script> --}}
    <script defer src="https://unpkg.com/alpinejs@3.2.3/dist/cdn.min.js"></script>

</head>

<body>
    <div id="app" x-data="app" class="font-poppins w-full">
        {{ $nav }}
        <div class="w-full md:grid flex md:grid-cols-12 grid-cols-none">
            <div class="w-full col-span-8 col-start-3">
                {{ $content }}
            </div>
        </div>
        <x-footer></x-footer>

        <button @click="scrolltoTop"
            class="p-3 fixed bottom-10 right-10 animate-bounce z-10 rounded-full shadow-md bg-gray-100 hidden" id="topButton">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18">
                </path>
            </svg>
        </button>
    </div>

    @stack('script')
    @livewireScripts

    <script>
        document.addEventListener('alpine:init', () => {
            Alpine.data('app', () => ({
                scrolltoTop() {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            }));
        });
    
        var topBtn = document.getElementById("topButton");
        window.onscroll = function () {
            (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ?
            topBtn.classList.remove("hidden"): topBtn.classList.add("hidden");
    
        }
    </script>

</body>

</html>
