export default class Color {
    static fromHex(hex: string): number[] {
        if (!Color.validateHex(hex)) {
            throw new Error("Invalid hex color");
        }
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b, 255];
    }

    static validateHex(hex: string): boolean {
        return /^#[0-9A-F]{6}$/i.test(hex);
    }
}
