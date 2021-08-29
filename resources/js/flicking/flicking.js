import { Arrow } from "@egjs/flicking-plugins";

var docEditor = document.getElementById("editor-choice");
var docHeadline = document.getElementById("headline");

if (docEditor) {
    const editor = new Flicking("#editor-choice", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: true,
    });

    editor.addPlugins(new Arrow());
}

if (docHeadline) {
    const headline = new Flicking("#headline", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: true,
    });

    headline.addPlugins(new Arrow());
}
