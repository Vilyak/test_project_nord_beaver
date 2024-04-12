import { Sprite, Texture, Ticker } from "pixi.js";
import { GameState } from "./GameModel";

export class DynamicEnvironment {
    private readonly SLOPE_WIDTH = 1280;
    private readonly MAX_SLOPES = 15;
    private readonly ANDGLE = 7;
    private readonly SPEED = 10;

    private slope: Sprite;

    public sumDelta: number = 0;

    private updateFn: any = (delta: number) => this.updateSlope(delta)

    constructor(
        private ticker: Ticker,
        private slopeTexture: Texture
    ) {
        this.slope = new Sprite(slopeTexture);
        this.setInitialData();
    }

    private setInitialData() {
        this.slope.angle = 7;
        this.slope.position.set(-200, 416);
        this.sumDelta = 0;
    }

    private updateSlope(delta: number) {
        const radians = this.ANDGLE * Math.PI / 180;
        const deltaX = Math.cos(radians) * this.SPEED * delta;
        const deltaY = Math.sin(radians) * this.SPEED * delta;
        this.slope.x -= deltaX;
        this.slope.y -= deltaY;

        this.sumDelta += deltaX;
    }

    getSlope() {
        return this.slope;
    }

    build() {
        for (let i = 0; i < this.MAX_SLOPES; i++) {
            const slopeNext = new Sprite(this.slopeTexture);
            this.slope.addChild(slopeNext);
            slopeNext.x = (i + 1) * this.SLOPE_WIDTH;
        }

        return this.slope;
    }

    onChangeState(state: GameState) {
        if (state === GameState.inProgress) {
            this.ticker.add(this.updateFn);
        }

        if (state === GameState.Ended) {
            this.ticker.remove(this.updateFn);
            this.setInitialData();
        }
    }
}