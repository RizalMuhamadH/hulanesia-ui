<footer class="mt-8">
    <div class="footer">
        <div class="flex flex-wrap">
            <div class="footer__content text-center">
                <p class="text-sm text-gray-700">Copyright 2021 Hulanesia</p>
            </div>
            {{-- <div class="lg:w-1/3 w-full lg:m-0 m-6 mb-0">
                <ul class="text-center">
                    <li class="inline-block">
                        <a href="#" class="inline-block text-lg px-2 text-gray-700 hover:text-black"> <i class="fa fa-facebook"></i> </a>
                    </li>
                    <li class="inline-block">
                        <a href="#" class="inline-block text-lg px-2 text-gray-700 hover:text-black"> <i class="fa fa-twitter"></i> </a>
                    </li>
                    <li class="inline-block">
                        <a href="#" class="inline-block text-lg px-2 text-gray-700 hover:text-black"> <i class="fa fa-linkedin"></i> </a>
                    </li>
                    <li class="inline-block">
                        <a href="#" class="inline-block text-lg px-2 text-gray-700 hover:text-black"> <i class="fa fa-snapchat"></i> </a>
                    </li>
                    <li class="inline-block">
                        <a href="#" class="inline-block text-lg px-2 text-gray-700 hover:text-black"> <i class="fa fa-instagram"></i> </a>
                    </li>
                </ul>
            </div> --}}
            <div class="footer__content">
                <ul class="text-center">
                    <li class="inline-block"> <a class="footer__content__menu" href="{{ route('page', 'tentang-kami') }}">Tentang Kami</a> </li>
                    <li class="inline-block"> <a class="footer__content__menu" href="{{ route('page', 'redaksi') }}">Redaksi</a> </li>
                    <li class="inline-block"> <a class="footer__content__menu" href="{{ route('page', 'info-iklan') }}">Info Iklan</a> </li>
                    <li class="inline-block"> <a class="footer__content__menu" href="{{ route('page', 'Karir') }}">Karir</a> </li>
                    <li class="inline-block"> <a class="footer__content__menu" href="{{ route('page', 'kontak') }}">Kontak</a> </li>
                    <li class="inline-block"> <a class="footer__content__menu" href="{{ route('page', 'pedoman') }}">Pedoman</a> </li>
                </ul>
            </div>
        </div>
    </div>
</footer>

{{-- <footer class="text-teal-400 body-font bg-teal-600">
    <div
        class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col border-t border-gray-200">
        <div class="md:w-1/2 w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-white p-2 bg-red-700 rounded-full"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span class="ml-3 text-xl text-white">Hulanesia</span>
            </a>
            <p class="mt-2 text-sm text-white">Air plant banjo lyft occupy retro adaptogen indego</p>
        </div>
        <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div class="md:w-1/2 w-full px-4">
                <h2 class="title-font font-bold text-white tracking-widest text-md mb-3">Kanal</h2>
                <div class="flex">
                    @php
                        $splits = array_chunk($menu['hits'], 5)
                    @endphp
                    @foreach ($splits as $split)
                    <nav class="list-none mb-10 w-1/2">
                        @foreach ($split as $item)
                        <li>
                            <a class="text-white hover:text-red-300" href="{{ route('category', $item['_source']['slug']) }}">{{ $item['_source']['name'] }}</a>
                        </li>
                        @endforeach
                    </nav>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
    <div class="lg:w-1/2 w-full mb-8">
        <ul class="text-center">
            <li class="inline-block"> <a class="text-white hover:text-black hover:underline text-sm p-3" href="{{ route('page', 'tentang-kami') }}">Tentang Kami</a> </li>
            <li class="inline-block"> <a class="text-white hover:text-black hover:underline text-sm p-3" href="{{ route('page', 'redaksi') }}">Redaksi</a> </li>
            <li class="inline-block"> <a class="text-white hover:text-black hover:underline text-sm p-3" href="{{ route('page', 'info-iklan') }}">Info Iklan</a> </li>
            <li class="inline-block"> <a class="text-white hover:text-black hover:underline text-sm p-3" href="{{ route('page', 'Karir') }}">Karir</a> </li>
            <li class="inline-block"> <a class="text-white hover:text-black hover:underline text-sm p-3" href="{{ route('page', 'kontak') }}">Kontak</a> </li>
            <li class="inline-block"> <a class="text-white hover:text-black hover:underline text-sm p-3" href="{{ route('page', 'pedoman') }}">Pedoman</a> </li>
        </ul>
    </div>
    <div class="bg-gray-900">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-white text-sm text-center sm:text-left">© 2020 Dev —
                <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-400 ml-1"
                    target="_blank">@Developer</a>
            </p>
            <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a class="text-gray-200">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                </a>
                <a class="ml-3 text-gray-200">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        class="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                        </path>
                    </svg>
                </a>
                <a class="ml-3 text-gray-200">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                </a>
                <a class="ml-3 text-gray-200">
                    <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                        <path stroke="none"
                            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
                        </path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                </a>
            </span>
        </div>
    </div>
</footer> --}}
