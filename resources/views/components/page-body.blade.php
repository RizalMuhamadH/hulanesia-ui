<div>
    <div class="flex flex-wrap">
        <div class="md:w-36 w-full ml-auto p-3 text-center md:order-1 order-2">
        </div>
        <div class="md:w-2/3 w-full mr-auto md:p-3 p-6 md:order-2 order-1">

            <div class="md:text-xl text-lg font-semibold leading-normal">
                <p>{{ $page['_source']['title'] ?? '' }}</p>
            </div>
            <div class="mt-5 md:text-xl text-lg leading-normal text-gray-900">
                {!! $page['_source']['content'] ?? '' !!}
            </div>

        </div>
    </div>
</div>
