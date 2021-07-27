<x-layouts.app>
    @push('title')
    <title>Hulanesia | Tag</title>
    @endpush
    <x-slot name="content">
        <div class="container mx-auto">
    
            <div class="flex flex-wrap">
    
                <div class="lg:w-2/3 w-full">
                    <x-recent-news :posts="$posts" :name="''"></x-recent-news>

                    <x-paginate></x-paginate>
                </div>
    
                <div class="lg:w-1/3 w-full px-4">
                    <x-popular-news :posts="$popular"></x-popular-news>
                    <!-- popular-wrapper -->
                </div>
    
            </div>
        </div>
    </x-slot>
</x-layouts.app>