import { ICanvas } from "../canvas";
import ImageManipulator from "./ImageManipulator";

export interface IDrawer {
    canvas: ICanvas;
    context: CanvasRenderingContext2D;
    imageManipulator: ImageManipulator;
    width: number;
    height: number;

    clear(): void;
    drawPixel(x: number, y: number, color: number[]): void;
}

class Drawer implements IDrawer {
    canvas: ICanvas;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    imageManipulator!: ImageManipulator;

    constructor(canvas: ICanvas) {
        this.canvas = canvas;
        this.context = canvas.context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.init();
    }

    private init() {
        const imageData: ImageData = this.context.createImageData(
            this.width,
            this.height
        );
        this.imageManipulator = new ImageManipulator(imageData);
    }

    private putImageData() {
        this.context.putImageData(this.imageManipulator.imageData, 0, 0);
    }

    clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawPixel(x: number, y: number, color: number[]): void {
        this.imageManipulator.setPixel(x, y, color);
        this.putImageData();
    }
}

export default Drawer;
