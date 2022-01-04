<div>

    <div class="container md:mx-auto mx-2">
        <h3 class="text-2xl font-semibold p-5 pl-0">{{ $name }}</h3>
    </div>

    <div class="container mx-auto">
        <div class="flex flex-wrap md:space-x-2 space-x-0">
            @foreach ($photos as $item)
                <div class="lg:w-1/3 md:w-1/2 w-full">
                    <div class="flex-item border-0 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-3 m-2 lg:ml-0">
                        <a href="{{ route('photo', [$item['_source']['id'], Carbon\Carbon::parse($item['_source']['created_at'])->format('dmY'), $item['_source']['slug']]) }}">
                            {{-- <img src="/storage/{{ $item['images'][0]['media']['cropped'] }}" alt="{{ $item['title'] }}"
                                class="object-cover w-full block" style="height: 180px"> --}}
                                <img src="{{ env('STORAGE').'/storage/'.$item['_source']['images'][0]['media']['original'] }}" alt="{{ $item['_source']['title'] }}"
                                class="object-cover w-full block">
                        </a>
                        <h2 class="text-gray-800 font-semibold text-base leading-tight p-3 pb-0 line-clamp-2"> <a
                                href="{{ route('photo', [$item['_source']['id'], Carbon\Carbon::parse($item['_source']['created_at'])->format('dmY'), $item['_source']['slug']]) }}">
                                {{ $item['_source']['title'] }} </a></h2>
                        <div class="w-full text-xs p-3 pt-2">
                            {{-- <div class="text-gray-600"> <a href="author.html" class="text-black hover:underline">Neelam
                                    Munir</a> in <a href="category-page.html" class="text-black hover:underline">
                                    Culture
                                </a> </div> --}}
                            <div class="text-gray-600"> <span>{{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }} WIB</span> </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
