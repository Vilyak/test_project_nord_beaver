import { Sprite, Texture } from "pixi.js";

export class Button extends Sprite {

    private callback: (() => void) | undefined;

    constructor(
        private idleTexture: Texture,
        private hoverTexture: Texture,
        private pressedTexture: Texture,
    ) {
        super(idleTexture);
        this.interactive = true;
        this.cursor = 'pointer';
        this.onmouseover = this.onHover;
        this.onmousedown = this.onPress;
        this.ontouchstart = this.onPress;
        this.onmouseup = this.onUnPress;
        this.ontouchend = this.onUnPress;

        this.ontouchendoutside = this.changeOnIdle;
        this.onmouseleave = this.changeOnIdle;
    }

    private onHover() {
        this.texture = this.hoverTexture;
    }

    private onPress() {
        this.texture = this.pressedTexture;
    }

    private changeOnIdle() {
        this.texture = this.idleTexture;
    }

    private onUnPress() {
        this.changeOnIdle();
        this.callback?.()
    }

    public onClick(callback: () => void) {
        this.callback = callback;
    }

    public setVisible(value: boolean) {
        this.visible = value;
    }
}