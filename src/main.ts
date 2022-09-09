import Canvas from "./canvas/index.js";
import Drawer from "./drawer/index.js";

document.querySelector<HTMLDivElement>(
    "#app"
)!.innerHTML = `<canvas id="canvas"></canvas>`;

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

const canvasInstance = new Canvas({
    canvas,
    width: 800,
    height: 600,
});

const drawerInstance = new Drawer(canvasInstance);

drawerInstance.drawPixel(10, 10, "blue");
