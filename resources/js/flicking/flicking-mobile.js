import { AutoPlay } from "@egjs/flicking-plugins";

const flicking = new Flicking("#editor-choice", { circular: true, horizontal: true, align: "center", autoResize: true, duration: 500 });

flicking.addPlugins(new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }));


