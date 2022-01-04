@if ($paginator->hasPages())
    <div class="most-recent-items-pagination pagination py-5 px-5">
        <ul class="flex">
            @if (!$paginator->onFirstPage())
                <li class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md hover:bg-teal-500 hover:text-white">
                    <a href="{{ $paginator->previousPageUrl() }}" >
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                    </a>
                    {{-- <a class="border border-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-white"
                        href="{{ $paginator->previousPageUrl() }}">{!! __('Previous') !!}</a> --}}
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <span aria-disabled="true">
                        <span
                            class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline">{{ $element }}</span>
                    </span>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                        <li class="flex items-center justify-center px-4 py-2 mx-1 transition-colors duration-200 transform rounded-md sm:inline bg-teal-500 text-white">
                            <span>{{ $page }}</span>
                        </li>
                        @else
                        <li class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline hover:bg-teal-500 hover:text-white" >
                            <a aria-label="{{ __('Go to page :page', ['page' => $page]) }}" href="{{ $url }}">{{ $page }}</a>
                        </li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            @if ($paginator->hasMorePages())
                <li class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md hover:bg-teal-500 hover:text-white">
                    <a href="{{ $paginator->nextPageUrl() }}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    {{-- <a class="border border-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-white"
                        href="{{ $paginator->nextPageUrl() }}">{!! __('Next') !!}</a> --}}
                </li>
            @endif

        </ul>

    </div>
@endif
