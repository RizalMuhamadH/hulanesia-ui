<!DOCTYPE html>
<html lang="en">
<head>
    @yield('title')
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @yield('head')
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @yield('style')
</head>
<body class="font-poppins">
    <x-navbar></x-navbar>
    @yield('content')
    @yield('script')
</body>
</html>