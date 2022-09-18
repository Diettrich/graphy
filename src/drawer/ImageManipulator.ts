// TODO use better architecture

export interface IImageManipulator {
    imageData: ImageData;
    data: Uint8ClampedArray;
    width: number;
    height: number;

    getImgData(): ImageData;
    getPixel(x: number, y: number): number[];
    setPixel(x: number, y: number, color: number[]): void;
    setTransparent(): void;
    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[]
    ): void;
    drawTransparentRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[]
    ): void;
}

export default class ImageManipulator {
    imageData: ImageData;
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(imageData: ImageData) {
        this.imageData = imageData;
        this.data = imageData.data;
        this.width = this.imageData.width;
        this.height = this.imageData.height;
    }

    private getIndex(x: number, y: number): number {
        x = Math.floor(x);
        y = Math.floor(y);
        return (x + y * this.width) * 4;
    }

    getImgData(): ImageData {
        return this.imageData;
    }

    getPixel(x: number, y: number): number[] {
        const index = this.getIndex(x, y);
        return [
            this.data[index],
            this.data[index + 1],
            this.data[index + 2],
            this.data[index + 3],
        ];
    }

    setPixel(x: number, y: number, color: number[]): void {
        const index = this.getIndex(x, y);
        this.data[index] = color[0];
        this.data[index + 1] = color[1];
        this.data[index + 2] = color[2];
        this.data[index + 3] = color[3];
    }

    setTransparent(): void {
        for (let i = 3; i < this.data.length; i += 4) {
            this.data[i] = 0;
        }
    }

    drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[]
    ): void {
        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                this.setPixel(i, j, color);
            }
        }
    }

    drawTransparentRect(
        x: number,
        y: number,
        width: number,
        height: number,
        color: number[]
    ): void {
        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                const pixel = this.getPixel(i, j);
                const newPixel = [
                    (pixel[0] * (255 - color[3])) / 255 +
                        (color[0] * color[3]) / 255,
                    (pixel[1] * (255 - color[3])) / 255 +
                        (color[1] * color[3]) / 255,
                    (pixel[2] * (255 - color[3])) / 255 +
                        (color[2] * color[3]) / 255,
                    (pixel[3] * (255 - color[3])) / 255 +
                        (color[3] * color[3]) / 255,
                ];
                this.setPixel(i, j, newPixel);
            }
        }
    }
}
