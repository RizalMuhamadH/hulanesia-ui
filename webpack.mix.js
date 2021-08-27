const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js")
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")])
    .postCss(
        "resources/css/swiper/6.7.0/swiper-bundle.min.css",
        "public/css/swiper/6.7.0/swiper-bundle.min.css"
    );
mix.babel(
    "resources/js/swiper/6.7.0/swiper-bundle.min.js",
    "public/js/swiper/6.7.0/swiper-bundle.min.js"
);

mix.js(
    "resources/js/flicking/flicking.js",
    "public/js/flicking/flicking.js"
);

mix.js(
    "resources/js/flicking/flicking-mobile.js",
    "public/js/flicking/flicking-mobile.js"
);
