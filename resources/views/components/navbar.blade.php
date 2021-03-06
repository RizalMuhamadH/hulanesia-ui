<!-- Require css -->
<style>
    .scroll-hidden::-webkit-scrollbar {
        height: 0px;
        background: transparent;
        /* make scrollbar transparent */
    }

</style>

<nav class="nav" x-data="{
            open: false,
            get isOpen() { return this.open },
            toggle() { this.open = ! this.open },
          }">
    <div class="container px-6 py-3 mx-auto">
        <div class="nav__top">
            <div class="nav__top__content">
                <a class="nav__top__content__logo" href="/">Hulanesia</a>

                <!-- Search input on desktop screen -->
                <div class="nav__search">
                    <div class="relative">
                        <span class="nav__search__logo">
                            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </span>
                        <form action="{{ route('search') }}" method="GET" role="search">
                            <input type="text" name="search" value="{{ old('word') }}" class="nav__search__input"
                                placeholder="Search">
                        </form>
                    </div>
                </div>
                {{-- @if (Agent::isMobile()) --}}
                    <!-- Mobile menu button -->
                    <div class="flex md:hidden">
                        <button type="button" x-on:click="toggle"
                            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                            aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path fill-rule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                                </path>
                            </svg>
                        </button>
                    </div>
                {{-- @endif --}}
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <div class="items-center md:flex" :class="isOpen == true ? '' : 'hidden'">
                {{-- <div class="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                            href="#">Home</a>
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                            href="#">Blog</a>
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                            href="#">Compoents</a>
                        <a class="my-1 text-sm leading-5 text-gray-700 transition-colors duration-200 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:mx-4 md:my-0"
                            href="#">Courses</a>
                    </div>
    
                    <div class="flex items-center py-2 -mx-1 md:mx-0">
                        <a class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto"
                            href="#">Login</a>
                        <a class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
                            href="#">Join free</a>
                    </div> --}}

                <!-- Search input on mobile screen -->
                <div class="mt-3 md:hidden">
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </span>

                        <form action="{{ route('search') }}" method="GET" role="search">
                            <input type="text" name="search" value="{{ old('word') }}"
                                class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
                                placeholder="Search">
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="nav__bottom">
            @foreach ($menu['hits'] as $item)
                <a href="{{ route('category', $item['_source']['slug']) }}"
                    class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-200 transform md:my-0 hover:border-b-2 hover:border-solid hover:border-teal-400 {{ Request::segment(1) == $item['_source']['slug']? 'border-teal-400 border-b-2 text-gray-500': 'text-gray-300' }}">{{ $item['_source']['name'] }}</a>
            @endforeach
            <a href="{{ route('photo.index') }}"
                class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-200 transform md:my-0 hover:border-b-2 hover:border-solid hover:border-teal-400 {{ Request::segment(1) == 'photo' ? 'border-teal-400 border-b-2 text-gray-500': 'text-gray-300' }}">Photo</a>
        </div>
    </div>
</nav>
