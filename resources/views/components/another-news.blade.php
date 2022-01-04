<div>

    <div class="flex flex-wrap text-gray-900 mb-6 md:mx-0 mx-2">
        <h3 class="text-2xl font-semibold">{!! $name !!}</h3>
    </div>

    @if (!Agent::isMobile())
        <!-- featured section -->
        <div class="flex flex-wrap md:space-y-3 mb-16">
            <!-- main post -->
            <div class="mb-4 lg:mb-0  p-4 lg:p-0 w-full md:w-3/6 relative rounded block">
                <img src="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    class="rounded-md object-cover w-full h-64">
                <span class="text-green-700 text-sm hidden md:block mt-4"> Technology </span>
                <h1 class="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
                    Ignorant branched humanity led now marianne too.
                </h1>
                <p class="text-gray-600 mb-4">
                </p>
            </div>

            <!-- sub-main posts -->
            <div class="w-full md:w-3/6">
                <!-- post 1 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    {{-- <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" /> --}}
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Gadgets </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            At every tiled on ye defer do. No attention suspected oh difficult.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Wonder matter now can estate esteem assure fat roused. Am performed on existence as
                            discourse
                            is. Pleasure friendly at marriage blessing or
                        </p>
                    </div>
                </div>

                <!-- post 2 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    {{-- <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" /> --}}
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Bitcoin </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            Fond his say old meet cold find come whom. The sir park sake bred.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Integer commodo, sapien ut vulputate viverra, Integer commodo
                            Integer commodo, sapien ut vulputate viverra, Integer commodo
                        </p>
                    </div>
                </div>
                <!-- post 3 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    {{-- <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" /> --}}
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Insights </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            Advice me cousin an spring of needed. Tell use paid law ever yet new.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Meant to learn of vexed if style allow he there. Tiled man stand tears ten joy there terms
                            any
                            widen.
                        </p>
                    </div>
                </div>
                <!-- post 4 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    {{-- <img src="https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" /> --}}
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Cryptocurrency </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            Advice me cousin an spring of needed. Tell use paid law ever yet new.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Meant to learn of vexed if style allow he there. Tiled man stand tears ten joy there terms
                            any
                            widen.
                        </p>
                    </div>
                </div>

            </div>

        </div>
        <!-- end featured section -->

    @else
        <!-- featured section -->
        <div class="flex flex-wrap md:flex-col md:space-y-3 mb-16">
            <!-- main post -->
            <div class="mb-4 lg:mb-0  p-4 lg:p-0 w-full md:w-3/6 relative rounded block">
                <img src="https://images.unsplash.com/photo-1427751840561-9852520f8ce8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                    class="rounded-md object-cover w-full h-64">
                <span class="text-green-700 text-sm hidden md:block mt-4"> Technology </span>
                <h1 class="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
                    Ignorant branched humanity led now marianne too.
                </h1>
                <p class="text-gray-600 mb-4">
                </p>
            </div>

            <!-- sub-main posts -->
            <div class="w-full md:w-3/6">
                <!-- post 1 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                        class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" />
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Gadgets </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            At every tiled on ye defer do. No attention suspected oh difficult.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Wonder matter now can estate esteem assure fat roused. Am performed on existence as
                            discourse
                            is. Pleasure friendly at marriage blessing or
                        </p>
                    </div>
                </div>

                <!-- post 2 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                        class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" />
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Bitcoin </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            Fond his say old meet cold find come whom. The sir park sake bred.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Integer commodo, sapien ut vulputate viverra, Integer commodo
                            Integer commodo, sapien ut vulputate viverra, Integer commodo
                        </p>
                    </div>
                </div>
                <!-- post 3 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                        class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" />
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Insights </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            Advice me cousin an spring of needed. Tell use paid law ever yet new.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Meant to learn of vexed if style allow he there. Tiled man stand tears ten joy there terms
                            any
                            widen.
                        </p>
                    </div>
                </div>
                <!-- post 4 -->
                <div class="rounded w-full flex flex-col md:flex-row mb-10">
                    <img src="https://images.unsplash.com/photo-1489844097929-c8d5b91c456e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
                        class="block md:hidden lg:block rounded-md h-64 md:h-32 m-4 md:m-0" />
                    <div class="bg-white rounded px-4">
                        <span class="text-green-700 text-sm hidden md:block"> Cryptocurrency </span>
                        <div class="md:mt-0 text-gray-800 font-semibold text-xl mb-2">
                            Advice me cousin an spring of needed. Tell use paid law ever yet new.
                        </div>
                        <p class="block md:hidden p-2 pl-0 pt-1 text-sm text-gray-600">
                            Meant to learn of vexed if style allow he there. Tiled man stand tears ten joy there terms
                            any
                            widen.
                        </p>
                    </div>
                </div>

            </div>

        </div>
        <!-- end featured section -->
    @endif

</div>
