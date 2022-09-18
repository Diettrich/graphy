import Canvas, { ICanvas } from "./canvas";
import Drawer, { IDrawer } from "./drawer";
import Graph from "./graph";

import testAndDemo from "./testAndDemo";

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

const graphInstance: Graph = new Graph(drawerInstance);

testAndDemo(graphInstance);
