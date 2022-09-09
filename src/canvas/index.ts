interface IConstructorCanvas {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}

interface ICanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
}

class Canvas implements ICanvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor({ canvas, width, height }: IConstructorCanvas) {
        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    clear(): void {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

export default Canvas;
