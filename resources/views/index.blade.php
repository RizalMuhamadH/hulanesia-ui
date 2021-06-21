@extends('layouts.app')
@section('title')
    <title>Hulanesia</title>
@endsection
@section('content')

    <div class="max-w-6xl mx-auto my-8">
        <div class="flex flex-wrap">
            <div class="swiper-container lg:w-2/3 w-full">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                    <!-- Slides -->
                    <div class="swiper-slide">
                        <div class="relative h-full">
                            <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                                <div class="text-white text-sm py-2">
                                    31 September 2021
                                </div>
                                <p class="font-medium text-white text-2xl line-clamp-2">
                                    Kabupaten Cirebon Catat Lonjakan Kasus Covid-19 Tertinggi
                                </p>
                            </div>

                            <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                            <img class="rounded-xl w-full h-full align-middle border-none"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="relative h-full">
                            <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                                <div class="text-white text-sm py-2">
                                    31 September 2021
                                </div>
                                <p class="font-medium text-white text-2xl line-clamp-2">
                                    Kabupaten Cirebon Catat Lonjakan Kasus Covid-19 Tertinggi
                                </p>
                            </div>

                            <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                            <img class="rounded-xl w-full h-full align-middle border-none"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="relative h-full">
                            <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                                <div class="text-white text-sm py-2">
                                    31 September 2021
                                </div>
                                <p class="font-medium text-white text-2xl line-clamp-2">
                                    Kabupaten Cirebon Catat Lonjakan Kasus Covid-19 Tertinggi
                                </p>
                            </div>

                            <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                            <img class="rounded-xl w-full h-full align-middle border-none"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                        </div>
                    </div>
                </div>
                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev text-gray-600"></div>
                <div class="swiper-button-next"></div>

            </div>
            {{-- <div class="relative lg:w-2/3 w-full">
                <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                    <div class="text-white text-sm py-2">
                        31 September 2021
                    </div>
                    <p class="font-medium text-white text-2xl line-clamp-2">
                        Kabupaten Cirebon Catat Lonjakan Kasus Covid-19 Tertinggi
                    </p>
                </div>

                <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                <img class="rounded-xl w-full h-full align-middle border-none"
                    src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                    alt="" />
            </div> --}}
            <div class="lg:w-1/3 w-full">
                <div class="feature-list p-3 pt-0 lg:px-4">
                    <h2 class="text-2xl font-semibold">Featured</h2>
                    <div class="list">

                        <div class="flex item my-3 border leading-normal border-gray-300 p-3 rounded items-center">
                            <img class="rounded-md w-20 h-20 align-middle border-none mr-2 object-cover"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                            <div class="flex flex-col">
                                <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                        class="no-underline uppercase hover:underline text-gray-700 text-xs">Sport</a></div>
                                <h2 class="text-sm font-medium line-clamp-2"><a href=""> Optimize your web desing process
                                        with rapid
                                        prototyping </a></h2>
                            </div>
                        </div>

                        <div class="flex item my-3 border leading-normal border-gray-300 p-3 rounded items-center">
                            <img class="rounded-md w-20 h-20 align-middle border-none mr-2 object-cover"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                            <div class="flex flex-col">
                                <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                        class="no-underline uppercase hover:underline text-gray-700 text-xs">Sport</a></div>
                                <h2 class="text-sm font-medium line-clamp-2"><a href=""> Optimize your web desing process
                                        with rapid
                                        prototyping </a></h2>
                            </div>
                        </div>

                        <div class="flex item my-3 border leading-normal border-gray-300 p-3 rounded items-center">
                            <img class="rounded-md w-20 h-20 align-middle border-none mr-2 object-cover"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                            <div class="flex flex-col">
                                <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                        class="no-underline uppercase hover:underline text-gray-700 text-xs">Sport</a></div>
                                <h2 class="text-sm font-medium line-clamp-2"><a href=""> Optimize your web desing process
                                        with rapid
                                        prototyping </a></h2>
                            </div>
                        </div>

                        <div class="flex item my-3 border leading-normal border-gray-300 p-3 rounded items-center">
                            <img class="rounded-md w-20 h-20 align-middle border-none mr-2 object-cover"
                                src="https://www.ayocirebon.com/images-cirebon/post/articles/2021/05/07/10894/masjid_pusaka_baiturrahmah_-_imy.jpg"
                                alt="" />
                            <div class="flex flex-col">
                                <div class="info text-sm font-semibold mb-1"><a href="category-page.html"
                                        class="no-underline uppercase hover:underline text-gray-700 text-xs">Sport</a></div>
                                <h2 class="text-sm font-medium line-clamp-2"><a href=""> Optimize your web desing process
                                        with rapid
                                        prototyping </a></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
