import { Arrow } from "@egjs/flicking-plugins";

const flicking = new Flicking("#editor-choice", { circular: true, horizontal: true, align: "center", autoResize: true });

flicking.addPlugins(new Arrow());

