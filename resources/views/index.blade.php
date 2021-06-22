@extends('layouts.app')
@section('title')
    <title>Hulanesia</title>
@endsection
@section('content')

    <div class="container mx-auto my-8">
        <div class="flex flex-wrap">
            <x-headline></x-headline>
            <x-breaking-news></x-breaking-news>
        </div>
    </div>
    <div class="container mx-auto">

        <div class="flex flex-wrap">

            <div class="lg:w-2/3 w-full">
                <x-recent-news></x-recent-news>
            </div>


            <div class="lg:w-1/3 w-full px-4">
                <x-popular-news></x-popular-news>
                <!-- popular-wrapper -->
            </div>

        </div>

        <x-category-news></x-category-news>
    </div>
    
@endsection
@section('script')
    <script>
        const swiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    </script>
@endsection
