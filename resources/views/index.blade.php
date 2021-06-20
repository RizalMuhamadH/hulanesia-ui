@extends('layouts.app')
@section('title')
    <title>Hulanesia</title>
@endsection
@section('content')

    <div class="max-w-6xl mx-auto my-8">
        <div class="flex flex-wrap">
            <div class="lg:w-2/3 w-full">
                <div class="lg:m-0 m-3 first-featuredbg-cover relative bg-cover overflow-hidden rounded shadow-lg"
                    style="background-image: url(https://picsum.photos/780/420); height: 420px;">
                    <div class="transition-3 overlay-500 lg:p-10 p-3 w-full h-full text-white">

                        <div class="read-full-store absolute p-5 right-0 bottom-0">
                            <a href="single-post.html"
                                class="font-light border-b pb-1 border-gray-300 hover:border-gray-100 hover:text-gray-100">Read
                                Full Story</a>
                        </div>

                        <div class="info text-sm">
                            By <span class="font-semibold">Amir Rehman</span> On <span class="font-semibold">24 August,
                                2019</span>
                        </div>
                        <h1 class="leading-snug text-3xl font-bold my-4">Optimize your web desing process with rapid
                            prototyping</h1>
                        <p class="text-normal leading-normal font-light">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quia consequuntur natus laudantium saepe ducimus cum non at aperiam incidunt provident
                            minus fuga voluptatibus aspernatur eos quam, aliquam ullam neque distinctio?</p>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/3 w-full">
                <div class="feature-list p-3 pt-0 lg:px-8">
                    <h2 class="text-2xl font-semibold">Featured</h2>
                    <div class="list">

                        <div class="item my-3 border leading-normal border-gray-300 p-3 rounded">
                            <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                    class="no-underline uppercase hover:underline text-gray-700 text-xs">Sport</a></div>
                            <h2 class="text-lg font-semibold"><a href=""> Optimize your web desing process with rapid
                                    prototyping </a></h2>
                        </div>

                        <div class="item my-3 border leading-normal border-gray-300 p-3 rounded">
                            <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                    class="no-underline uppercase hover:underline text-gray-700 text-xs">Culture</a></div>
                            <h2 class="text-lg font-semibold"><a href=""> Optimize your web desing process with rapid
                                    prototyping </a></h2>
                        </div>

                        <div class="item my-3 border leading-normal border-gray-300 p-3 rounded">
                            <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                    class="no-underline uppercase hover:underline text-gray-700 text-xs">SEO</a></div>
                            <h2 class="text-lg font-semibold"><a href=""> Optimize your web desing process with rapid
                                    prototyping </a></h2>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
