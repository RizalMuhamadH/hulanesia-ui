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
            <li class="inline-flex items-center">
                <a href="{{ route('category', $post['_source']['category']['slug']) }}" class="text-teal-400">{{ $post['_source']['category']['name'] }}</a>
            </li>
        </ul>
    </div>



    <div class="md:my-5 w-full">
        <h1 class="md:text-4xl text-xl font-bold text-gray-900 md:mx-0 mx-6">{{ $post['_source']['title'] }}</h1>

        <div class="flex mt-3 md:mx-0 md:mb-0 mx-6 mb-6">
            {{-- <div class="w-auto">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/storage/{{ $post['image']['media']['small'] }}" class="object-cover w-10 h-10" alt="{{ $post['title'] }}">
                </div>
            </div> --}}
            <div class="w-full text-xs pt-px">
                <div class="text-gray-600"> {{ $post['_source']['author']['name'] ?? '' }}
                </div>
                <div class="text-gray-600">  <span>{{ Carbon\Carbon::parse($post['_source']['created_at'])->format('d M Y, H:m') }} WIB</span> </div>
            </div>
        </div>
        <!-- author-info -->

    </div>
    <div class="md:rounded-lg overflow-hidden shadow-2xl w-full md:h-101 mb-10 self-center">
        <img src="{{ env('ASSETS') }}/storage/{{ $post['_source']['image']['media']['original'] ?? '' }}" alt="{{ $post['_source']['title'] }}" class="object-cover w-full">
    </div>
    <p class="text-center text-sm ">
        {{ $post['_source']['image']['caption'] ?? '' }}
    </p>
</div>
