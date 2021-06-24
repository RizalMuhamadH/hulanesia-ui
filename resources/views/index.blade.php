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

        <x-collection-news></x-collection-news>
    </div>
    
@endsection