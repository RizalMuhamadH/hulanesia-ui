<div>

    @foreach ($posts as $item)
        <div class="flex md:flex-wrap flex-row md:pr-5 pr-0 mb-10  md:mx-0 mx-2">

            <div class="w-2/3 md:mx-0 mx-2 md:order-1 order-2">
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

            {{-- <img class="sm:w-1/3 h-auto md:h-44 sm:mt-0 mt-3 bg-gray-100 object-cover rounded overflow-hidden md:order-2 order-1"
                src="/storage/{{ $item['image']['media']['small'] ?? '' }}" alt="{{ $item['title'] }}"> --}}
            <img class="w-1/3 h-24 md:h-44 sm:mt-0 mt-3 bg-gray-100 object-cover rounded-lg overflow-hidden md:order-2 order-1"
                src="https://picsum.photos/seed/picsum/200/300">

        </div>
    @endforeach

    <div wire:loading wire:target="loadMore" class="w-full">
        <div class="flex md:flex-wrap flex-row md:pr-5 pr-0 mb-10  md:mx-0 mx-2">

            <div class="w-2/3 md:mx-0 mx-2 md:order-1 order-2">
                <div data-placeholder class="overflow-hidden relative bg-gray-200 w-24 h-6"></div>

                <div data-placeholder class="overflow-hidden relative bg-gray-200 mb-3 mt-1 w-11/12 h-8"></div>
                @if (!Agent::isMobile())
                    <div data-placeholder class="w-11/12 h-5 overflow-hidden relative bg-gray-200"></div>
                @endif
                <div data-placeholder class=" mt-1 w-1/2 h-5 overflow-hidden relative bg-gray-200">
                </div>
                <!-- most-recent-item-info -->
            </div>

            <div data-placeholder
                class="w-1/3 h-24 md:h-44 sm:mt-0 mt-3 overflow-hidden relative bg-gray-200 md:order-2 order-1"></div>

        </div>
    </div>

    <div class="w-full flex flex-col items-stretch">

        @if (!$isEmpty)
            <button wire:click="loadMore"
                class="self-center px-4 py-2 rounded-md border border-gray-300 hover:bg-blue-600 hover:border-0 hover:text-white"
                type="button">
                Load More
            </button>
        @endif
    </div>

    @push('style')
        <style>
            [data-placeholder]::after {
                content: " ";
                box-shadow: 0 0 50px 9px rgba(254, 254, 254);
                position: absolute;
                top: 0;
                left: -100%;
                height: 100%;
                animation: load 1s infinite;
            }

            @keyframes load {
                0% {
                    left: -100%
                }

                100% {
                    left: 150%
                }
            }

        </style>
    @endpush
</div>
