<!DOCTYPE html>
<html lang="en">
<head>
    @stack('title')
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @stack('head')
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/swiper/6.7.0/swiper-bundle.min.css') }}" rel="stylesheet">
    @stack('style')
    
    <script src="{{ asset('js/swiper/6.7.0/swiper-bundle.min.js') }}"></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
    {{-- <script defer src="https://unpkg.com/alpinejs@3.1.0/dist/cdn.min.js"></script> --}}
    {{-- <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer></script> --}}
</head>
<body class="font-poppins">
    <x-navbar></x-navbar>
    {{ $content }}
    <x-footer></x-footer>

    @stack('script')
</body>
</html>