import { ICanvas } from "../canvas";
import ImageManipulator, { IImageManipulator } from "./ImageManipulator";

// TODO consider using also ImageBitmap ?
// TODO consider using also OffscreenCanvas ?
// TODO maybe some webgl stuff ?

export interface IDrawer {
    canvas: ICanvas;
    context: CanvasRenderingContext2D;
    imageManipulator: IImageManipulator;
    width: number;
    height: number;

    clear(): void;
    drawPixel(x: number, y: number, color: number[]): void;
    drawCanvasLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        option: {
            color: number[] | string;
            width?: number;
        }
    ): void;
    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[],
        isTransparent?: boolean
    ): void;
    drawCanvasRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[] | string
    ): void;
}

class Drawer implements IDrawer {
    canvas: ICanvas;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    imageManipulator!: IImageManipulator;

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
        const imageData = this.imageManipulator.getImgData();
        this.context.putImageData(imageData, 0, 0);
    }

    clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawPixel(x: number, y: number, color: number[]): void {
        this.imageManipulator.setPixel(x, y, color);
        this.putImageData();
    }

    drawCanvasLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        option?: {
            color: number[] | string;
            width?: number;
        }
    ): void {
        const color = option?.color || [0, 0, 0, 255];
        const width = option?.width || 1;

        if (typeof color === "string") {
            this.context.strokeStyle = color;
        } else {
            this.context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
        }
        this.context.lineWidth = width;

        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[],
        isTransparent: boolean = false
    ): void {
        if (isTransparent || color[3] < 255) {
            this.imageManipulator.drawTransparentRect(
                x,
                y,
                width,
                height,
                color
            );
        } else {
            this.imageManipulator.drawRect(x, y, width, height, color);
        }
        this.putImageData();
    }

    drawCanvasRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[] | string
    ): void {
        if (typeof color === "string") {
            this.context.fillStyle = color;
        } else {
            this.context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
        }
        this.context.fillRect(x, y, width, height);
    }
}

export default Drawer;
