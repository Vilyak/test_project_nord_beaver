import { Text } from "pixi.js";

export class ZubiloText extends Text {

    constructor(text?: string | number) {
        super(text, { fontFamily: 'Zubilo' });
    }

    size(size: number) {
        this.style.fontSize = size;

        return this;
    }

    color(color: string) {
        this.style.fill = color;

        return this;
    }

    withShadow() {
        this.style.dropShadow = true;
        this.style.dropShadowAlpha = 0.5;
        this.style.dropShadowAngle = 0.95;
        this.style.dropShadowDistance = 6;

        return this;
    }
}