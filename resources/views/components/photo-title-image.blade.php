<div class="container mx-auto flex flex-col">

    <div class="md:my-5 my-4 md:w-3/4 md:mx-auto mx-3">
        <ul class="flex text-gray-500 text-sm lg:text-base">
            <li class="inline-flex items-center">
                <a href="/" class="hover:text-teal-400">Home</a>
                <svg class="h-5 w-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </li>
            {{-- <li class="inline-flex items-center">
                <a href="/components" class="hover:text-teal-400">Components</a>
                <svg class="h-5 w-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </li> --}}
            <li class="inline-flex items-center">
                <a href="{{ route('index') }}" class="text-teal-400">Photo</a>
            </li>
        </ul>
    </div>



    <div class="md:my-5 md:w-3/4 w-full mx-auto">
        <h1 class="md:text-4xl text-xl font-bold text-gray-900 md:mx-0 mx-6">{{ $photo['title'] }}</h1>

        <div class="flex mt-3 md:mx-0 md:mb-0 mx-6 mb-6">
            {{-- <div class="w-auto">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/storage/{{ $post['image']['media']['small'] }}" class="object-cover w-10 h-10" alt="{{ $post['title'] }}">
                </div>
            </div> --}}
            <div class="w-full text-xs pt-px">
                <div class="text-gray-600"> {{ $photo['user_name'] ?? '' }}
                </div>
                <div class="text-gray-600">
                    <span>{{ Carbon\Carbon::parse($photo['created_at'])->format('d M Y, H:m') }} WIB</span> </div>
            </div>
        </div>
        <!-- author-info -->

    </div>
    <div class="gallery md:rounded-lg overflow-hidden shadow-2xl w-full md:h-101 h-full mb-10 self-center relative">

        <a data-caption="Vestibulum lobortis ultricies ipsum, a maximus ligula dignissim in. Sed consectetur tellus egestas, consequat dolor at, tempus augue. "
            data-fancybox="gallery-1" href="https://placeimg.com/640/480/any">
            <img src="https://placeimg.com/640/480/any" alt="{{ $photo['title'] }}" class="object-cover w-full">
        </a>
        {{-- <img src="/storage/{{ $photo['images'][0]['media']['small'] ?? '' }}" alt="{{ $photo['title'] }}" class="object-cover w-full"> --}}
        <a data-caption="Vestibulum lobortis ultricies ipsum, a maximus ligula dignissim in. Sed consectetur tellus egestas, consequat dolor at, tempus augue. "
            data-fancybox="gallery-1" href="https://lipsum.app/id/1/800x600">
        </a>
        <a data-caption="Short caption" data-fancybox="gallery-1" href="https://lipsum.app/id/2/800x600">
        </a>
        <a data-fancybox="gallery-1" href="https://lipsum.app/id/3/800x600">
        </a>

        <div class="absolute z-10 top-0 right-0">
            <div class="rounded-3xl p-2 bg-gray-500 bg-opacity-30 text-white mt-2 mr-2">
                <svg aria-hidden="true" class="h-5 w-5" focusable="false" data-prefix="far" data-icon="images"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path fill="currentColor"
                        d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
    <p class="text-center text-sm ">
        {{ $photo['images'][0]['caption'] ?? '' }}
    </p>
</div>
