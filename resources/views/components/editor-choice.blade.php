<div class="w-full">
    <div class="flex flex-wrap text-gray-900 mb-6">
        <h3 class="text-2xl font-semibold">Editor Choice</h3>
    </div>
    <div id="editor-choice" class="flicking-viewport">

        <div class="flicking-camera py-3 px-4">
            @foreach ($posts['hits'] as $item)
                <a href="#" class="flex gap-2 h-24 md:w-1/2 w-11/12 panel">
                    {{-- <img src="/storage/{{ $item['image']['media']['small'] }}"
                        class="shadow rounded max-w-full h-auto align-middle border-none"
                        alt="{{ $item['image']['caption'] }}" /> --}}
                    <img src="https://picsum.photos/seed/picsum/200/300"
                        class="shadow rounded w-1/3 h-auto align-middle border-none"
                        alt="{{ $item['image']['caption'] }}" />
                    <div class="flex flex-col w-2/3">
                        <div class="text-black text-xs py-2">
                            <span class="text-green-700 font-bold">{{ $item['category_name'] }}</span> 
                        </div>
                        <p class="font-bold text-black text-xs md:line-clamp-2 line-clamp-3">
                            {{ $item['title'] }}
                        </p>
                        <span class="text-gray-400 text-xs">{{ Carbon\Carbon::parse($item['created_at'])->format('d M Y, H:m') }}</span>
                    </div>
                </a>
            @endforeach
        </div>
        @if (!Agent::isMobile())
            <span class="flicking-arrow-prev"></span>
            <span class="flicking-arrow-next"></span>
        @endif
    </div>
</div>
