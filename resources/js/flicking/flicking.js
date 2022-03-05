import { Arrow } from "@egjs/flicking-plugins";

var docEditor = document.getElementById("editor-choice");
var docHeadline = document.getElementById("headline");
var headline;
var editor;

if (docEditor) {
    editor = new Flicking("#editor-choice", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: true,
    });

    editor.addPlugins(new Arrow({prevElSelector: ".editor-prev", nextElSelector: ".editor-next"}));
}

if (docHeadline) {
    headline = new Flicking("#headline", {
        circular: true,
        horizontal: true,
        align: "center",
        autoResize: true,
    });

    headline.addPlugins(new Arrow({prevElSelector: ".headline-prev", nextElSelector: ".headline-next"}));

}