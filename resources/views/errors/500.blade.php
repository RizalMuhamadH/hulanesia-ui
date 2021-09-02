<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Not Found - 404</title>


    <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css">
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>

</head>

<body>
    <main aria-labelledby="pageTitle"
        class="flex items-center justify-center h-screen bg-gray-100 dark:bg-dark dark:text-light">
        <div class="p-4 space-y-10">
            <div class="flex flex-col items-start space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
                <p class="font-semibold text-red-500 text-9xl dark:text-red-600">500</p>
                <div class="space-y-2">
                    <h1 id="pageTitle" class="flex items-center space-x-2">
                        <svg aria-hidden="true" class="w-6 h-6 text-red-500 dark:text-red-600"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span class="text-xl font-medium text-gray-600 sm:text-2xl dark:text-light">
                            Oops! Terjadi kesalahan.
                        </span>
                    </h1>
                    <p class="text-base font-normal text-gray-600 dark:text-gray-300">
                        Halaman yang anda cari sementara tidak tersedia.
                    </p>
                    <p class="text-base font-normal text-gray-600 dark:text-gray-300">
                        Anda dapat kembali ke halaman utama atau memuat kembali halaman ini.
                    </p>
                </div>

            </div>
            <div>
                <a href="/"
                class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Kembali</a>
            </div>

        </div>
    </main>
</body>

</html>
