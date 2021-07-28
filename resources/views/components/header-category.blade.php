<div>
    <div class="flex flex-wrap text-gray-900 mb-6">
        <h3 class="text-2xl font-semibold">{{ $name }}</h3>
    </div>

    <div class="w-full flex flex-wrap">
        @php
            $main = $posts->splice(0, 1);
            $list = $posts;
        @endphp
        <div class="lg:w-2/3 w-full">
            @foreach ($main as $item)
                <div class="flex-item border border-gray-300 rounded m-2 lg:ml-0">
                    <img src="/storage/{{ $item->image->thumbnail('small', 'path') }}" alt="{{ $item->title }}"
                        class="object-cover w-full md:h-100 h-auto" alt="{{ $item->title }}">
                    <h2 class="text-gray-800 font-medium text-2xl leading-tight p-3 pb-0"> <a
                            href="{{ route('read', [$item->id, $item->created_at->format('dmY'), $item->slug]) }}">
                            {{ $item->title }} </a></h2>
                    <div class="w-full text-xs p-3 pt-2">
                        {{-- <div class="text-gray-600"> <a href="author.html" class="text-black hover:underline">Neelam
                            Munir</a> in <a href="category-page.html" class="text-black hover:underline"> Culture
                        </a> </div> --}}
                        <div class="text-gray-600"> <span>{{ $item->created_at->format('d M Y, H:m') }} WIB</span>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="lg:w-1/3 w-full">
            <div class="p-3 pt-0 lg:px-4">
                @foreach ($list as $item)
                    <div class="flex item my-3 border leading-normal border-gray-300 p-3 rounded items-center">
                        <img class="rounded-md w-20 h-20 align-middle border-none mr-2 object-cover"
                            src="/storage/{{ $item->image->thumbnail('cropped', 'path') }}"
                            alt="{{ $item->title }}" />
                        <div class="flex flex-col">
                            <h2 class="text-sm font-medium line-clamp-2"><a
                                    href="{{ route('read', [$item->id, $item->created_at->format('dmY'), $item->slug]) }}">
                                    {{ $item->title }} </a></h2>
                            <div class="w-full text-xs pt-2">
                                {{-- <div class="text-gray-600"> <a href="author.html" class="text-black hover:underline">Neelam
                                    Munir</a> in <a href="category-page.html" class="text-black hover:underline"> Culture
                                </a> </div> --}}
                                <div class="text-gray-600"> <span>{{ $item->created_at->format('d M Y, H:m') }}
                                        WIB</span> </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
