<div class="lg:my-5 m-6">

    <div class="container mx-auto">
        <h3 class="text-2xl font-semibold p-5 pl-0">{{ $name }}</h3>
    </div>

    <div class="container mx-auto">
        <div class="flex flex-wrap">
            @foreach ($posts as $item)
                <div class="lg:w-1/4 md:w-1/2 w-full">
                    <div class="flex-item border border-gray-300 rounded hover:shadow-2xl transition-3 m-2 lg:ml-0">
                        <img src="https://picsum.photos/seed/picsum/200/300" alt="{{ $item['_source']['title'] }}"
                            class="object-cover w-full block" style="height: 180px" alt="related post image">
                        <h2 class="text-gray-800 font-semibold text-lg leading-tight p-3 pb-0 line-clamp-2"> <a
                                href="{{ route('read', [$item['_source']['category']['slug'],$item['_source']['id'], Carbon\Carbon::parse($item['_source']['created_at'])->format('dmY'), $item['_source']['slug']]) }}">
                                {{ $item['_source']['title'] }} </a></h2>
                        <div class="w-full text-xs p-3 pt-2">
                            {{-- <div class="text-gray-600"> <a href="author.html" class="text-black hover:underline">Neelam
                                    Munir</a> in <a href="category-page.html" class="text-black hover:underline">
                                    Culture
                                </a> </div> --}}
                            <div class="text-gray-600"> <span>{{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }}
                                WIB</span> </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
