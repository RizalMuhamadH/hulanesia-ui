<div>

    <div class="flex flex-wrap text-gray-900 mb-6 md:mx-0 mx-2">
        <h3 class="text-2xl font-semibold">{!! $name !!}</h3>
    </div>

    @foreach ($posts as $item)
        <div class="flex md:flex-wrap flex-row md:pr-5 pr-0 mb-10 md:mx-0 mx-2">

            <div class="w-2/3 md:mx-0 mx-2 md:order-1 order-2">
                <span
                    class="text-xs text-gray-500 uppercase border-b-2 border-green-500">{{ $item['_source']['category']['name'] }}</span>

                <h2
                    class="md:text-lg text-sm font-semibold text-gray-900 leading-tight mb-3 mt-1 md:line-clamp-3 line-clamp-2">
                    <a
                        href="{{ route('read', [$item['_source']['category']['slug'],$item['_source']['id'], Carbon\Carbon::parse($item['_source']['created_at'])->format('dmY'), $item['_source']['slug']]) }}">{{ $item['_source']['title'] }}</a>
                </h2>
                @if (!Agent::isMobile())
                    <p class="text-gray-600 text-sm line-clamp-2 sm:block hidden">{{ $item['_source']['description'] }}</p>
                @endif
                <div class="text-gray-700 mt-1">
                    <span class="text-xs">{{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }}
                        WIB</span>
                </div>
                <!-- most-recent-item-info -->
            </div>

            <img class="w-1/3 h-24 md:h-44 sm:mt-0 mt-3 bg-gray-100 object-cover rounded-lg overflow-hidden md:order-2 order-1"
                src="{{ env('ASSETS') }}/storage/{{ $item['_source']['image']['media']['small'] ?? '' }}" alt="{{ $item['_source']['title'] }}">
            {{-- <img class="w-1/3 h-24 md:h-44 sm:mt-0 mt-3 bg-gray-100 object-cover rounded-lg overflow-hidden md:order-2 order-1"
                src="https://picsum.photos/seed/picsum/200/300"> --}}

        </div>
    @endforeach

</div>
