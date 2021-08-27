<div class="w-full">
    <div id="editor-choice" class="flicking-viewport">

        <div class="flicking-camera py-3 px-4">
            @foreach ($posts['hits'] as $item)
                <a href="#" class="flex gap-2 h-24 w-1/3 panel">
                    <img src="/storage/{{ $item['image']['media']['small'] }}"
                        class="shadow rounded max-w-full h-auto align-middle border-none"
                        alt="{{ $item['image']['caption'] }}" />
                    <div class="flex flex-col">
                        <div class="text-black text-xs py-2">
                            <span class="text-green-700 font-bold">{{ $item['category_name'] }}</span> |
                            {{ Carbon\Carbon::parse($item['created_at'])->format('d M Y, H:m') }}
                        </div>
                        <p class="font-bold text-black text-xs line-clamp-2">
                            {{ $item['title'] }}
                        </p>
                    </div>
                </a>
            @endforeach
        </div>
        @if (!Agent::isMobile())
        <span class="flicking-arrow-prev"></span>
        <span class="flicking-arrow-next"></span>
        @endif
    </div>
    @push('script')
        @if (!Agent::isMobile())
            <script src="{{ mix('js/flicking/flicking.js') }}"></script>
        @else
            <script src="{{ mix('js/flicking/flicking-mobile.js') }}"></script>
        @endif
    @endpush
</div>
