import { Sprite } from "pixi.js";
import gsap from "gsap";
import { EventEmitter } from "../../common/EventEmitter";

export class Player {
    private readonly IN_GAME_POSITIONS = { x: 520, y: 334 };

    public endedTween?: gsap.core.Tween;
    public inJump: boolean;
    private isInitialized: boolean;

    constructor(
        private player: Sprite
    ) {
        EventEmitter.Instance.on('jump', () => this.jump());
        this.inJump = false;
        this.isInitialized = false;
    }

    setInitialPositions() {
        this.player.position.set(50, 277);
        this.player.angle = 9;
        this.player.scale.set(0.4);
        this.endedTween = undefined;
    }

    start() {
        this.isInitialized = false;
        gsap.to(this.player, { ...this.IN_GAME_POSITIONS, duration: 2, onComplete: () => { this.isInitialized = true } });
    }

    jump() {
        if (!this.isInitialized) {
            return;
        }

        if (!this.inJump) {
            this.inJump = true;
            gsap.to(this.player.position, {
                duration: 1,
                y: 144,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(this.player.position, {
                        duration: 1,
                        y: 334,
                        ease: "power2.inOut",
                        onComplete: () => {
                            this.inJump = false;
                        }
                    });
                }
            });
        }
    }

    build() {
        this.setInitialPositions();

        return this.player;
    }

    endAnimation(slope: Sprite, onComplete: () => void) {
        this.isInitialized = false;
        this.endedTween = gsap.to(slope, {
            rotation: 0, y: 517, x: '-=100', duration: 2, onComplete
        });
        gsap.to(this.player, {
            x: '+=200', y: '+=19', duration: 2, rotation: 0, onComplete
        });
    }
}