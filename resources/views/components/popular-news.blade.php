<div class="sticky top-20">

    <div class="flex flex-wrap text-gray-900 mb-6">
        <h3 class="text-2xl font-semibold">Popular</h3>
    </div>

    @foreach ($posts['hits'] as $i => $item)
        <div class="mb-10">
            <div class="flex">
                <div class="w-1/3 lg:text-center">
                    <span class="text-3xl font-light text-gray-300">0{{ $i+1 }}</span>
                </div>
                <div class="w-full text-gray-400">
                    <h3 class="text-normal font-semibold leading-tight text-gray-900"> <a
                            href="{{ route('read', [$item['id'], Carbon\Carbon::parse( $item['created_at'])->format('dmY'), $item['slug']]) }}">{{ $item['title'] }}</a>
                    </h3>

                </div>
            </div>
        </div>
    @endforeach

    
</div>
