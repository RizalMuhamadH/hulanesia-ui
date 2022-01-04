@if (isset($page) && $page)
    <div class="most-recent-items-pagination pagination py-5 px-5">
        <ul class="flex">
            {{-- Pagination Elements --}}
            @foreach ($page as $key => $element)
                {{-- Array Of Links --}}
                @if ($element['num'] == $active_page)
                    <li
                        class="flex items-center justify-center px-4 py-2 mx-1 transition-colors duration-200 transform rounded-md sm:inline bg-teal-500 text-white">
                        <span>{{ $element['page'] }}</span>
                    </li>
                @else
                    <li
                        class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:inline hover:bg-teal-500 hover:text-white">
                        <a
                            href="{{ $element['url'] }}">{{ $element['page'] }}</a>
                    </li>
                @endif
            @endforeach
        </ul>

    </div>
@endif
