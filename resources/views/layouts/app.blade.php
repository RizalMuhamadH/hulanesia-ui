<!DOCTYPE html>
<html lang="en">
<head>
    @yield('title')
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @yield('head')
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/swiper/6.7.0/swiper-bundle.min.css') }}" rel="stylesheet">
    @yield('style')
    
    <script src="{{ asset('js/swiper/6.7.0/swiper-bundle.min.js') }}"></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
</head>
<body class="font-poppins">
    <x-navbar></x-navbar>
    @yield('content')
    <x-footer></x-footer>
    @yield('script')
</body>
</html>