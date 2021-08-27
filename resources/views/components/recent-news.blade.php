<div>

    <div class="flex flex-wrap text-gray-900 mb-6">
        <h3 class="text-2xl font-semibold">{!! $name !!}</h3>
    </div>

    @foreach ($posts['hits'] as $item)
        <div class="flex md:flex-wrap flex-row md:pr-5 pr-0 mb-10">

            <div class="sm:w-2/3 w-full md:mx-0 mx-2 md:order-1 order-2">
                <span
                    class="text-xs text-gray-500 uppercase border-b-2 border-green-500">{{ $item['category_name'] }}</span>

                <h2
                    class="md:text-lg text-sm font-semibold text-gray-900 leading-tight mb-3 mt-1 md:line-clamp-3 line-clamp-2">
                    <a
                        href="{{ route('read', [$item['id'], Carbon\Carbon::parse($item['created_at'])->format('dmY'), $item['slug']]) }}">{{ $item['title'] }}</a>
                </h2>
                @if (!Agent::isMobile())
                    <p class="text-gray-600 text-sm line-clamp-2 sm:block hidden">{{ $item['description'] }}</p>
                @endif
                <div class="text-gray-700 mt-1">
                    <span class="text-xs">{{ Carbon\Carbon::parse($item['created_at'])->format('d M Y, H:m') }}
                        WIB</span>
                </div>
                <!-- most-recent-item-info -->
            </div>

            <img class="sm:w-1/3 h-auto md:h-44 sm:mt-0 mt-3 bg-gray-100 object-cover rounded overflow-hidden md:order-2 order-1"
                src="/storage/{{ $item['image']['media']['small'] ?? '' }}" alt="{{ $item['title'] }}">

        </div>
    @endforeach

</div>
