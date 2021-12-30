<nav class="bg-gray-800 sticky top-0 z-50" x-data="{
    open: false,
    get isOpen() { return this.open },
    toggle() { this.open = ! this.open },
  }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <!-- Mobile menu button-->
                <button type="button" x-on:click="toggle"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Menu</span>
                    <!--
              Icon when menu is closed.
  
              Heroicon name: outline/menu
  
              Menu open: "hidden", Menu closed: "block"
            -->
                    <svg x-show="isOpen == false" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <!--
              Icon when menu is open.
  
              Heroicon name: outline/x
  
              Menu open: "block", Menu closed: "hidden"
            -->
                    <svg x-show="isOpen == true" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {{-- <div class="flex-shrink-0 flex items-center">
                    <img class="block lg:hidden h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
                    <img class="hidden lg:block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        alt="Workflow">
                </div> --}}

                {{-- {{ dd($menu->hits) }} --}}
                <div class="hidden sm:block sm:ml-6">
                    <div class="flex space-x-4">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <a href="/"
                            class="px-3 py-2 rounded-md text-sm font-semibold {{ Request::segment(1) == '' ? 'bg-gray-900 text-white' : 'text-gray-300' }}"
                            aria-current="page">Home</a>

                        @foreach ($menu['hits'] as $item)
                            <a href="{{ route('category', $item['_source']['slug']) }}"
                                class="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold {{ Request::segment(2) == $item['_source']['slug'] ? 'bg-gray-900 text-white' : 'text-gray-300' }}">{{ $item['_source']['name'] }}</a>
                        @endforeach
                    </div>
                </div>
            </div>

            <form action="{{ route('search') }}" method="GET" role="search">
                <div class="hidden sm:block relative pull-right pl-4 pr-4 md:pr-0">
                    <input type="search" name="word" placeholder="Search"
                        class="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal" value="{{ old('word') }}">
                    <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                        <svg class="fill-current pointer-events-none text-gray-500 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </div>
                </div>
            </form>

        </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1" :class="isOpen == true ? '' : 'hidden'">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <a href="/"
                class="block px-3 py-2 rounded-md text-base font-medium {{ Request::segment(1) == '' ? 'bg-gray-900 text-white' : 'text-gray-300' }}"
                aria-current="page">Home</a>

            @foreach ($menu['hits'] as $item)
                <a href="{{ route('category', $item['_source']['slug']) }}"
                    class="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium {{ Request::segment(2) == $item['_source']['slug'] ? 'bg-gray-900 text-white' : 'text-gray-300' }}">{{ $item['_source']['name'] }}</a>
            @endforeach

            <form action="{{ route('search') }}" method="GET" role="search">
                <div class="relative pl-4 pr-4 md:pr-0">
                    <input type="search" name="word" placeholder="Search"
                        class="w-full bg-gray-900 text-sm text-gray-400 transition border border-gray-800 focus:outline-none focus:border-gray-600 rounded py-1 px-2 pl-10 appearance-none leading-normal" value="{{ old('word') }}">
                    <div class="absolute search-icon" style="top: 0.375rem;left: 1.75rem;">
                        <svg class="fill-current pointer-events-none text-gray-500 w-4 h-4"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path
                                d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z">
                            </path>
                        </svg>
                    </div>
                </div>
            </form>

        </div>
    </div>
</nav>
