import Canvas from "./canvas/index.js";

document.querySelector<HTMLDivElement>(
    "#app"
)!.innerHTML = `<canvas id="canvas"></canvas>`;

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;

const CanvasInstance = new Canvas({
    canvas,
    width: 666,
    height: 500,
});
