import { AutoPlay, Fade, Pagination } from "@egjs/flicking-plugins";

var docEditor = document.getElementById("editor-choice");
var docHeadline = document.getElementById("headline");
var docPhoto = document.getElementById("photo");

if (docEditor) {
    const editor = new Flicking("#editor-choice", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: true,
        duration: 500,
    });

    editor.addPlugins(
        new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false })
    );
}

if (docHeadline) {
    const headline = new Flicking("#headline", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: true,
        duration: 500,
    });

    headline.addPlugins(
        // new Fade(),
        new Pagination({
            type: "bullet",
        })
    );
}

if (docPhoto) {
    const headline = new Flicking("#photo", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: false,
        duration: 500,
    });
}
