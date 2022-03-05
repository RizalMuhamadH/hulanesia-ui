<div class="w-full">

    <div id="headline" class="flicking-viewport">
        <!-- Additional required wrapper -->
        <div class="flicking-camera">
            <!-- Slides -->
            @foreach ($headline['hits'] as $item)
                <div class="md:w-full w-4/5 md:h-96 h-52 md:mx-2 mx-1 card-panel">
                    <div class="relative h-full">
                        <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                            <h1 class="font-medium text-white md:text-2xl text-lg line-clamp-2">
                                <a href="{{ $item['_source']['url'] }}">{{ $item['_source']['title'] }}</a>
                            </h1>
                            <div class="text-white text-xs py-2">
                                {{ Carbon\Carbon::parse($item['_source']['created_at'])->format('d M Y, H:m') }} WIB
                            </div>
                        </div>

                        <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                        {{-- <img class="rounded-xl w-full h-full align-middle border-none object-cover"
                            src="/storage/{{ $item['image']['media']['small'] }}" alt="{{ $item['title'] }}" /> --}}
                        <img class="rounded-xl w-full h-full align-middle border-none object-cover"
                            src="{{ env('ASSETS') . $item['_source']['image'] }}" />
                    </div>
                </div>
            @endforeach

        </div>
        <!-- If we need navigation buttons -->

        @if (!Agent::isMobile())
            <div class="headline-prev text-teal-500 absolute top-1/2 left-4 z-10 cursor-pointer">
                <svg class="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </div>
            <div class="headline-next text-teal-500 absolute top-1/2 right-4 z-10 cursor-pointer">
                <svg class="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                    </path>
                </svg>
            </div>
        @else
            <div class="flicking-pagination"></div>
        @endif
    </div>
</div>

@push('style')
    <style>
        /* .swiper-button-prev,
                .swiper-button-next {
                    background-image: none;
                } */

    </style>
@endpush

@push('script')
    <script>
        // const swiper = new Swiper('.swiper-container', {
        //     // Optional parameters
        //     direction: 'horizontal',
        //     loop: true,

        //     // If we need pagination
        //     pagination: {
        //         el: '.swiper-pagination',
        //     },

        //     // Navigation arrows
        //     navigation: {
        //         nextEl: '.swiper-button-next',
        //         prevEl: '.swiper-button-prev',
        //     },

        //     // And if we need scrollbar
        //     scrollbar: {
        //         el: '.swiper-scrollbar',
        //     },
        // });
    </script>
@endpush
