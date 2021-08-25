<div class="swiper-container w-full md:h-101 h-auto">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        @foreach ($headline['hits'] as $item)
        <div class="swiper-slide">
            <div class="relative h-full">
                <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                    <div class="text-white text-sm py-2">
                        {{ Carbon\Carbon::parse( $item['created_at'])->format('d M Y, H:m') }} WIB
                    </div>
                    <h1 class="font-medium text-white md:text-2xl text-lg line-clamp-2">
                        <a href="{{ route('read', [$item['id'], Carbon\Carbon::parse( $item['created_at'])->format('dmY'), $item['slug']]) }}">{{ $item['title'] }}</a>
                    </h1>
                </div>

                <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                <img class="rounded-xl w-full h-full align-middle border-none object-cover"
                    src="/storage/{{ $item['image']['media']['small'] }}"
                    alt="{{ $item['title'] }}" />
            </div>
        </div>
        @endforeach
        
    </div>
    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev text-gray-600"></div>
    <div class="swiper-button-next"></div>

</div>

@push('script')
    <script>
        const swiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    </script>
@endpush
