<div>

    <div class="container md:mx-auto mx-2">
        <h3 class="text-2xl font-semibold p-5 pl-0">{{ $name }}</h3>
    </div>

    <div class="container mx-auto">
        <div class="flex flex-wrap">
            @foreach ($photos as $item)
                <div class="w-full md:w-1/2 px-2 pb-12">
                    <div class="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth">
                        <a href="{{ route('photo.read', [$item['_source']['id'], Carbon\Carbon::parse($item['_source']['created_at'])->format('dmY'), $item['_source']['slug']]) }}" class="no-underline hover:no-underline">
                            <img src="{{ env('ASSETS') . '/storage/' . $item['_source']['images'][0]['media']['original'] }}"
                            alt="{{ $item['_source']['title'] }}"
                                class="h-48 w-full rounded-t object-cover shadow">
                            <div class="p-6 h-auto md:h-48">
                                <p class="text-gray-600 text-xs md:text-sm">{{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }}
                                    WIB</p>
                                <h2 class="font-bold text-xl text-gray-900 line-clamp-3">{{ $item['_source']['title'] }}</h2>
                                
                            </div>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
