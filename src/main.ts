import Canvas, { ICanvas } from "./canvas";
import Drawer, { IDrawer } from "./drawer";
import Color from "./utils/Color.js";

document.querySelector<HTMLDivElement>(
    "#app"
)!.innerHTML = `<canvas id="canvas"></canvas>`;

const canvas: HTMLCanvasElement =
    document.querySelector<HTMLCanvasElement>("#canvas")!;

const canvasInstance: ICanvas = new Canvas({
    canvas,
    width: 800,
    height: 600,
});

const drawerInstance: IDrawer = new Drawer(canvasInstance);

drawerInstance.drawPixel(10, 10, Color.fromHex("#ff0000"));
