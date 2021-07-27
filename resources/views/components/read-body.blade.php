<div>
    <div class="flex flex-wrap mt-3">
        <div class="md:w-36 w-full ml-auto p-3 text-center md:order-1 order-2">
            {{-- <h3 class="text-sm font-light uppercase mb-4">
                <span class="md:block inline">Share</span>
                <span class="md:block inline">With</span>
                <span class="md:block inline">Your</span>
                <span class="md:block inline">Friends</span>
            </h3>
            <ul class="flex flex-wrap items-center justify-center">
                <li class=" md:w-full w-auto md:mx-0 mx-1 flex items-center justify-center"><a href="#"
                        class="mb-2 border border-gray-300 text-2xl text-gray-800 transition-3 rounded hover:shadow-xl flex items-center justify-center w-12 h-12"><i
                            class="fa fa-facebook"></i></a></li>
                <li class=" md:w-full w-auto md:mx-0 mx-1 flex items-center justify-center"><a href="#"
                        class="mb-2 border border-gray-300 text-2xl text-gray-800 transition-3 rounded hover:shadow-xl flex items-center justify-center w-12 h-12"><i
                            class="fa fa-twitter"></i></a></li>
                <li class=" md:w-full w-auto md:mx-0 mx-1 flex items-center justify-center"><a href="#"
                        class="mb-2 border border-gray-300 text-2xl text-gray-800 transition-3 rounded hover:shadow-xl flex items-center justify-center w-12 h-12"><i
                            class="fa fa-instagram"></i></a></li>
                <li class=" md:w-full w-auto md:mx-0 mx-1 flex items-center justify-center"><a href="#"
                        class="mb-2 border border-gray-300 text-2xl text-gray-800 transition-3 rounded hover:shadow-xl flex items-center justify-center w-12 h-12"><i
                            class="fa fa-whatsapp"></i></a></li>
            </ul> --}}
        </div>
        <div class="md:w-2/3 w-full mr-auto md:p-3 p-6 md:order-2 order-1">

            <div class="md:text-xl text-lg font-semibold leading-normal">
                <p>{{ $post->description ?? '' }}</p>
            </div>
            <div class="mt-5 md:text-xl text-lg leading-normal text-gray-900">
                {!! $post->body ?? '' !!}
            </div>
            <div class="single-post-tags mt-12">
                <ul>
                    @foreach ($post->tags as $item)
                        <li class="inline-block"> <a href="{{ route('tag', $item->slug) }}"
                                class="inline-block border border-gray-300 px-3 transition-3 rounded hover:border-gray-500">{{ $item->name }}</a>
                        </li>
                    @endforeach
                </ul>
            </div>

        </div>
    </div>
</div>
