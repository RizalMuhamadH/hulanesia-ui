<div class="mt-6">

    <div class="flex flex-row justify-between text-gray-900 mb-6 mx-4">
        <h3 class="text-2xl font-semibold">{{ $name }}</h3>
        <a href="{{ route('category', \Illuminate\Support\Str::slug($name, '-')) }}" class="flex text-base items-center">
            <div>Lainnya</div>
            <div>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="4.86182" width="13" height="1" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M13.3278 6.07317L14.0349 5.36607L14.0328 5.36397L14.035 5.36179L13.3279 4.65469L13.3257 4.65686L9.08519 0.41632L8.37808 1.12343L12.6186 5.36397L8.37816 9.60443L9.08526 10.3115L13.3257 6.07107L13.3278 6.07317Z"
                        fill="black" />
                </svg>
            </div>
        </a>
    </div>

    <div class="flex flex-wrap md:space-x-8 md:mx-0 mx-2 justify-center">
        @foreach ($posts as $item)
            <a href="{{ route('read', [$item->id, $item->created_at->format('dmY'), $item->slug]) }}" class="flex flex-col md:w-1/5 w-full sm:h-auto h-64 sm:mt-0 mt-3">
                <img class="w-full bg-gray-100 object-cover rounded overflow-hidden"
                src="/storage/{{ $item->image->thumbnail('medium', 'path') }}"
                alt="{{ $item->title }}">
                <h2 class="text-normal font-semibold text-gray-900 leading-tight mt-1">{{ $item->title }}</h2>
                <span class="text-xs text-gray-700 mt-1">{{ $item->created_at->format('d M Y, H:m') }} WIB</span>
            </a>
        @endforeach
    </div>

</div>
