import { ICanvas } from "../canvas";
import ImgData from "./ImgData";

interface IDrawer {
    canvas: ICanvas;
    context: CanvasRenderingContext2D;
    imageData: ImgData;
    width: number;
    height: number;

    clear(): void;
    drawPixel(x: number, y: number, color: string): void;
}

class Drawer implements IDrawer {
    canvas: ICanvas;
    context: CanvasRenderingContext2D;
    imageData: ImgData;
    width: number;
    height: number;

    constructor(canvas: ICanvas) {
        this.canvas = canvas;
        this.context = canvas.context;
        this.width = canvas.width;
        this.height = canvas.height;
        // TODO use better OOP architecture
        this.imageData = new ImgData(
            this.context.createImageData(this.width, this.height)
        );
    }

    clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawPixel(x: number, y: number, color: string): void {
        console.log("drawPixel", x, y, color);
        console.log(this.imageData);
        // TODO use the color after converting it to SRGB
        this.imageData.setPixel(x, y, [0, 0, 255, 255]);
        // TODO use better OOP architecture
        // TODO WTF is this.imageData.imageData ????
        this.context.putImageData(this.imageData.imageData, 0, 0);
    }
}

export default Drawer;
