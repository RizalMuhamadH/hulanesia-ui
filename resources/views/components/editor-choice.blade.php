<div class="w-full">
    <div id="my-flicking" class="flicking-viewport">
        <div id="next" class="cursor-pointer text-yellow-500 h-4 w-4">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left"
                class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512">
                <path fill="currentColor"
                    d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
                </path>
            </svg>
        </div>

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
        <div id="prev" class="cursor-pointer text-yellow-500 h-4 w-4">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right"
                class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512">
                <path fill="currentColor"
                    d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
                </path>
            </svg>
        </div>
    </div>

    @push('script')
        <script type="module">
            // document.addEventListener('DOMContentLoaded', function() {
            //     var flicking = new Flicking("#my-flicking", {
            //         circular: true
            //     });

            //     flicking.addPlugins(new Arrow);

                // const next = document.querySelector("#next");
                // const prev = document.querySelector("#prev");

                // next.addEventListener("click", () => {
                //     flicking.next();
                // });

                // prev.addEventListener("click", () => {
                //     flicking.prev();
                // });
            // });
        </script>
    @endpush
</div>
