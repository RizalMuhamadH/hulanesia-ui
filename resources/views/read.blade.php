<x-layouts.app>
    @push('title')
        <title>Hulanesia</title>
    @endpush
    <x-slot name="content">
        <x-read-title-image></x-read-title-image>

        <div class="container mx-auto">

            <div class="flex flex-wrap">

                <div class="lg:w-2/3 w-full">
                    <x-read-body></x-read-body>
                </div>


                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news></x-popular-news>
                    <!-- popular-wrapper -->
                </div>

            </div>

            <div class="container mx-auto border-t border-gray-300"></div>

            <x-collection-news></x-collection-news>

            <x-category-news></x-category-news>
        </div>
    </x-slot>
</x-layouts.app>
