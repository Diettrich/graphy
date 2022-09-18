import { IDrawer } from "../drawer";

export default class Graph {
    private drawer: IDrawer;
    private width: number;
    private height: number;
    private baseWidth: number;
    private verticalOffset: number;
    private horizontalOffset: number;

    constructor(drawer: IDrawer) {
        this.drawer = drawer;
        this.baseWidth = 20;
        this.width = this.baseWidth;
        this.height = this.baseWidth * (drawer.height / drawer.width);
        this.horizontalOffset = this.width / 2;
        this.verticalOffset = this.height / 2;

        this.init();
    }

    init(): void {
        this.showGrid();
        this.drawDashLine();
        this.drawAxis();
    }

    clear(): void {
        this.drawer.clear();
    }

    setHorizontalOffset(offset: number): void {
        this.horizontalOffset = offset;
    }

    setVerticalOffset(offset: number): void {
        this.verticalOffset = offset;
    }

    convertToDrawerCoordinates(x: number, y: number): number[] {
        return [
            (x + this.horizontalOffset) * (this.drawer.width / this.width),
            (y + this.verticalOffset) * (this.drawer.height / this.height),
        ];
    }

    drawAxis(): void {
        const origin = this.convertToDrawerCoordinates(0, 0);

        const axisOptions = {
            color: "black",
            width: 2,
        };

        this.drawer.drawCanvasLine(
            0,
            origin[1],
            this.drawer.width,
            origin[1],
            axisOptions
        );
        this.drawer.drawCanvasLine(
            origin[0],
            0,
            origin[0],
            this.drawer.height,
            axisOptions
        );
    }

    drawDashLine(): void {
        const origin = this.convertToDrawerCoordinates(0, 0);

        const dashOptions = {
            color: "black",
            width: 1,
        };

        const firstX = -Math.floor(this.horizontalOffset) - 1;
        const lastX = Math.floor(this.width / 2) + 1;

        for (let i = firstX; i < lastX; i++) {
            const x = this.convertToDrawerCoordinates(i, 0)[0];
            this.drawer.drawCanvasLine(
                x,
                origin[1] - 5,
                x,
                origin[1] + 5,
                dashOptions
            );
        }

        const firstY = -Math.floor(this.verticalOffset) - 1;
        const lastY = Math.floor(this.height / 2) + 1;

        for (let i = firstY; i < lastY; i++) {
            const y = this.convertToDrawerCoordinates(0, i)[1];
            this.drawer.drawCanvasLine(
                origin[0] - 5,
                y,
                origin[0] + 5,
                y,
                dashOptions
            );
        }

        // TODO: draw axis labels
    }

    showGrid(): void {
        const gridOptions = {
            color: "lightgray",
            width: 1,
        };

        const firstX = -Math.floor(this.horizontalOffset) - 1;
        const lastX = Math.floor(this.width / 2) + 1;

        for (let i = firstX; i < lastX; i++) {
            const x = this.convertToDrawerCoordinates(i, 0)[0];
            this.drawer.drawCanvasLine(
                x,
                0,
                x,
                this.drawer.height,
                gridOptions
            );
            this.drawer.drawCanvasLine(
                this.drawer.width - x,
                0,
                this.drawer.width - x,
                this.drawer.height,
                gridOptions
            );
        }

        const firstY = -Math.floor(this.verticalOffset) - 1;
        const lastY = Math.floor(this.height / 2) + 1;

        for (let i = firstY; i < lastY; i++) {
            const y = this.convertToDrawerCoordinates(0, i)[1];
            this.drawer.drawCanvasLine(0, y, this.drawer.width, y, gridOptions);
            this.drawer.drawCanvasLine(
                0,
                this.drawer.height - y,
                this.drawer.width,
                this.drawer.height - y,
                gridOptions
            );
        }
    }
}
