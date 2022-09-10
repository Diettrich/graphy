import { IDrawer } from "./drawer";
import Color from "./utils/Color";

const testAndDemo = (drawerInstance: IDrawer): void => {
    drawerInstance.drawPixel(100, 100, Color.fromHex("#ff00ff"));
    drawerInstance.drawPixel(10.5, 10, Color.fromHex("#000000"));
    drawerInstance.drawRect(300, 300, 100, 100, Color.fromHex("#0000ff"));

    let dt: number = 0;

    const draw = (): void => {
        drawerInstance.drawRect(
            100 + Math.cos(dt) * 50,
            100 + Math.sin(dt) * 50,
            100,
            100,
            Color.fromHex("#ff0000")
        );
        dt += 0.01;
        requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
};

export default testAndDemo;
