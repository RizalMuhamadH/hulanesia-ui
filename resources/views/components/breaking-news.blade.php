<div class="lg:w-1/3 w-full">
    <div class="p-3 pt-0 lg:px-4">
        <h2 class="text-2xl font-semibold">{{ $name }}</h2>
        @foreach ($posts as $item)
        <div class="flex item my-3 border leading-normal border-gray-300 p-3 rounded items-center">
            <img class="rounded-md w-20 h-20 align-middle border-none mr-2 object-cover"
                src="/storage/{{ $item->image->thumbnail('cropped') ?? '' }}"
                alt="{{ $item->title }}" />
            <div class="flex flex-col">
                <div class="info text-sm font-semibold mb-1"><a href="#"
                        class="no-underline uppercase hover:underline text-gray-700 text-xs">{{ $item->category->name }}</a></div>
                <h2 class="text-sm font-medium line-clamp-2"><a href="{{ route('read', [$item->id, $item->created_at->format('dmY'), $item->slug]) }}">{{ $item->title }}</a></h2>
            </div>
        </div>
        @endforeach
    </div>
</div>