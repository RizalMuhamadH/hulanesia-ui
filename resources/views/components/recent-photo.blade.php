<div class="w-full mt-10">
    <div
        class="
    flex
    items-center
    space-x-4
    border-b
    py-3
    px-2
    text-lg
    font-bold
    text-gray-500
    ">
        PHOTO
    </div>
    @if (!Agent::isMobile())

        <div class="w-full my-4 flex">


            <div class="flex flex-col w-3/5">
                <div class="relative w-full h-full">
                    <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                        <div class="text-white text-sm py-2">
                            {{ Carbon\Carbon::parse($photos['hits'][0]['_source']['created_at'])->format('d M Y, H:m') }}
                            WIB
                        </div>
                        <a href="{{ route('photo.read', [$photos['hits'][0]['_source']['id'], Carbon\Carbon::parse($photos['hits'][0]['_source']['created_at'])->format('dmY'), $photos['hits'][0]['_source']['slug']]) }}">
                            <p class="font-medium text-white text-2xl line-clamp-2">
                                {{ $photos['hits'][0]['_source']['title'] }}
                            </p>
                        </a>
                    </div>

                    <div class="w-full h-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30 ">
                    </div>
                    <img class="rounded-xl h-full w-full align-middle border-none object-cover"
                        src="{{ env('ASSETS').'/storage/'.$photos['hits'][0]['_source']['images'][0]['media']['original'] }}" alt="{{ $photos['hits'][0]['_source']['title'] }}" alt="{{ $photos['hits'][0]['_source']['title'] }}" />
                </div>
            </div>

            @php
                unset($photos['hits'][0]);
            @endphp

            <div class="flex flex-col w-2/5 pl-5 divide-y divide-gray-500 space-y-5">

                @foreach ($photos['hits'] as $item)
                    <div class="w-full flex pt-5">
                        {{-- <img class="rounded-xl w-48 h-36 align-middle border-none object-cover" src="/storage/{{ $item['images'][0]['media']['cropped'] }}" alt="{{ $item['title'] }}" /> --}}

                        <img class="rounded-xl w-48 h-36 align-middle border-none object-cover"
                            src="{{ env('ASSETS').'/storage/'.$item['_source']['images'][0]['media']['original'] }}" alt="{{ $item['_source']['title'] }}" alt="{{ $item['_source']['title'] }}" />

                        <div class="flex flex-col px-3 py-3">
                            <div class="text-sm py-2">
                                {{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }} WIB
                            </div>
                            <p class="font-medium text-base line-clamp-3">
                                {{ $item['_source']['title'] }}
                            </p>
                        </div>
                    </div>
                @endforeach

            </div>
        </div>
    @else
        <div class="w-full my-4 flex">
            <div id="photo" class="flicking-viewport">
                <!-- Additional required wrapper -->
                <div class="flicking-camera">
                    <!-- Slides -->
                    @foreach ($photos['hits'] as $item)
                    <div class="w-4/5 xl:w-1/4 p-6 flex flex-col">
                        <a href="{{ route('photo.read', [$item['_source']['id'], Carbon\Carbon::parse($item['_source']['created_at'])->format('dmY'), $item['_source']['slug']]) }}">
                            <img class="hover:grow hover:shadow-lg"
                                src="{{ env('ASSETS').'/storage/'.$item['_source']['images'][0]['media']['original'] }}" alt="{{ $item['_source']['title'] }}">
                            <div class="pt-3 flex items-center justify-between">
                                <p class="">{{ $item['_source']['title'] }}</p>
                                {{-- <svg class="h-6 w-6 fill-current text-gray-500 hover:text-black"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                                </svg> --}}
                            </div>
                            {{-- <p class="pt-1 text-gray-900">£9.99</p> --}}
                        </a>
                    </div>
                    @endforeach

                </div>
            </div>

        </div>
    @endif
</div>
