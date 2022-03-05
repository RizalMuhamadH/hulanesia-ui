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

    
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
    @stack('style')

    <style>
        html {
            scroll-behavior: smooth;    
        }
    </style>

</head>

<body>
    <div id="app" x-data="app" class="font-poppins w-full relative">
        <x-navbar :menu="$menu"></x-navbar>
        <div class="w-full md:grid flex md:grid-cols-12 grid-cols-none">
            <div class="w-full col-span-8 col-start-3 mt-32">
                {{ $content }}
            </div>
        </div>
        <x-footer :menu="$menu"></x-footer>
    </div>

    @stack('script')
</body>

</html>