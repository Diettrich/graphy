// TODO use better architecture
export default class ImgData {
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
        return (x + y * this.width) * 4;
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
        console.log("setPixel", x, y, color);
        const index = this.getIndex(x, y);
        this.data[index] = color[0];
        this.data[index + 1] = color[1];
        this.data[index + 2] = color[2];
        this.data[index + 3] = color[3];
    }
}
