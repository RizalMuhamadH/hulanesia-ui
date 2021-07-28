@if ($paginator->hasPages())
    <div class="most-recent-items-pagination pagination py-5">
        <ul>
            @if (!$paginator->onFirstPage())
                <li class="inline-block">
                    <a class="border border-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-white"
                        href="{{ $paginator->previousPageUrl() }}">{!! __('Previous') !!}</a>
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <span aria-disabled="true">
                        <span
                            class="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 cursor-default leading-5">{{ $element }}</span>
                    </span>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                        <li class="inline-block">
                            <span class="border border-gray-300 px-3 py-1 rounded bg-gray-800 text-white">{{ $page }}</span>
                        </li>
                        @else
                        <li class="inline-block">
                            <a class="border border-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-white" aria-label="{{ __('Go to page :page', ['page' => $page]) }}" href="{{ $url }}">{{ $page }}</a>
                        </li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            @if ($paginator->hasMorePages())
                <li class="inline-block">
                    <a class="border border-gray-300 px-3 py-1 rounded hover:bg-gray-800 hover:text-white"
                        href="{{ $paginator->nextPageUrl() }}">{!! __('Next') !!}</a>
                </li>
            @endif

        </ul>

    </div>
@endif
