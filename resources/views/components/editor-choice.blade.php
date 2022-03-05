<div class="w-full">
    <div class="flex flex-wrap text-gray-900 mb-6 md:mx-0 mx-2">
        <h3 class="text-2xl font-semibold">Editor Choice</h3>
    </div>
    <div id="editor-choice" class="flicking-viewport">

        <div class="flicking-camera py-3 px-4">
            @foreach ($posts['hits'] as $item)
                <a href="#" class="flex gap-2 h-24 md:w-1/2 w-11/12 panel">
                    {{-- <img src="/storage/{{ $item['image']['media']['small'] }}"
                        class="shadow rounded max-w-full h-auto align-middle border-none"
                        alt="{{ $item['image']['caption'] }}" /> --}}
                    <img src="{{ env('ASSETS').$item['_source']['image'] }}"
                        class="shadow rounded w-1/3 h-auto align-middle border-none"
                        alt="{{ $item['_source']['title'] }}" />
                    <div class="flex flex-col w-2/3">
                        <div class="text-black text-xs py-2">
                            <span class="text-green-700 font-bold">{{ $item['_source']['category'] }}</span> 
                        </div>
                        <p class="font-bold text-black text-xs md:line-clamp-2 line-clamp-3">
                            {{ $item['_source']['title'] }}
                        </p>
                        <span class="text-gray-400 text-xs">{{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }}</span>
                    </div>
                </a>
            @endforeach
        </div>
        @if (!Agent::isMobile())
        <div class="editor-prev text-teal-500 absolute top-1/4 left-4 z-10 cursor-pointer">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </div>
        <div class="editor-next text-teal-500 absolute top-1/4 right-4 z-10 cursor-pointer">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                </path>
            </svg>
        </div>
        @endif
    </div>
</div>
