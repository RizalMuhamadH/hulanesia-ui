<div class="swiper-container lg:w-2/3 w-full">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        @foreach ($headline as $item)
        <div class="swiper-slide">
            <div class="relative h-full">
                <div class="absolute z-20 bottom-0 left-0 flex flex-col px-3 py-3">
                    <div class="text-white text-sm py-2">
                        {{ $item->created_at->format('d, M Y') }}
                    </div>
                    <p class="font-medium text-white text-2xl line-clamp-2">
                        {{ $item->title }}
                    </p>
                </div>

                <div class="h-full w-full bg-gray-600 absolute z-10 rounded-xl border-none opacity-30"></div>
                <img class="rounded-xl w-full h-full align-middle border-none"
                    src="http://127.0.0.2:8000/storage/{{ $item->image->thumbnail('medium', 'path') }}"
                    alt="{{ $item->title }}" />
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
