<div class="w-full mt-10">
    <div
        class="
        flex
        items-center
        space-x-4
        border-b
        py-3
        text-lg
        font-bold
        text-gray-500
      ">
        PHOTO
    </div>

    <div class="w-full my-4 flex">
        

        <div class="flex flex-col w-3/5">
            <div class="relative w-full h-full">
                <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                    <div class="text-white text-sm py-2">
                        {{ Carbon\Carbon::parse($photos['hits'][0]['created_at'])->format('d M Y, H:m') }} WIB
                    </div>
                    <p class="font-medium text-white text-2xl line-clamp-2">
                        {{ $photos['hits'][0]['title'] }}
                    </p>
                </div>

                <div
                    class="w-full h-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30 ">
                </div>
                <img class="rounded-xl h-full w-full align-middle border-none object-cover"
                    src="https://placeimg.com/640/480/any" alt="{{ $photos['hits'][0]['title'] }}" />
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
                        src="https://placeimg.com/640/480/any" alt="{{ $item['title'] }}" />

                    <div class="flex flex-col px-3 py-3">
                        <div class="text-sm py-2">
                            {{ Carbon\Carbon::parse($item['created_at'])->format('d M Y, H:m') }} WIB</div>
                        <p class="font-medium text-base line-clamp-3">
                            {{ $item['title'] }}
                        </p>
                    </div>
                </div>
            @endforeach

        </div>
    </div>
</div>
