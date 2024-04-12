import { IPointData, Sprite } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping } from "../..";
import { OnChangePropHandler } from "../../mvc/decorators/OnChangePropHandler";
import { Button } from "../../common/components/Button";
import { GameEndController } from "./GameEndController";
import { ZubiloText } from "../../common/components/ZubiloText";
import gsap from "gsap";

export class GameEndView extends BaseView<GameEndController<GameEndView>> {

    private coins?: number;
    private score?: number;
    private distance?: number;

    @OnChangePropHandler('coins')
    onChangeCoins(coins: number) {
        this.coins = coins;
    }

    @OnChangePropHandler('score')
    onChangeScore(score: number) {
        this.score = score;
    }

    @OnChangePropHandler('distance')
    onChangeDistance(distance: number) {
        this.distance = distance;
    }

    render() {
        this.content.sortableChildren = true;

        const rays = this.assets.getSprite(AssetsMapping.rays);
        rays.zIndex = 1;
        gsap.to(rays, { rotation: Math.PI * 2, duration: 12, repeat: -1, ease: "none" });

        rays.anchor.set(0.5);
        rays.scale.set(0.7);
        rays.x = this.app.screen.width / 2;
        rays.y = this.app.screen.height / 2;

        this.content.addChild(rays);

        const backgroundSprite = this.assets.getSprite(AssetsMapping.infoPlateBig);
        this.content.sortableChildren = true;

        backgroundSprite.height = 600;
        backgroundSprite.width = 490;

        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = this.app.screen.width / 2;
        backgroundSprite.y = this.app.screen.height / 2;
        backgroundSprite.zIndex = 2;

        const title = new ZubiloText('New Record:').size(60).color('#003d71');
        title.anchor.set(0.5, 0.65);

        const scoreResult = new ZubiloText(this.score).size(184).color('#00fd17').withShadow();
        scoreResult.anchor.set(0.5);
        scoreResult.position.y = 150;

        const backgroundTitleSprite = this.assets.getSprite(AssetsMapping.titleBack);
        backgroundTitleSprite.anchor.set(0.5);

        backgroundTitleSprite.position.set(0, -410);
        backgroundTitleSprite.addChild(title, scoreResult);
        backgroundSprite.addChild(backgroundTitleSprite);
        this.content.addChild(backgroundSprite);

        const coin = this.assets.getSprite(AssetsMapping.collect_coin_icon);
        coin.anchor.set(0.5);
        coin.position.set(-220, -50);

        const distanceIcon = this.assets.getSprite(AssetsMapping.collect_distance_icon);
        distanceIcon.anchor.set(0.5);
        distanceIcon.position.set(-220, 120)

        backgroundSprite.addChild(coin);
        backgroundSprite.addChild(distanceIcon);

        const coinsText = new ZubiloText(this.coins).size(74).color('#f4ad25').withShadow();
        coinsText.anchor.set(0.5, 0.65);
        coinsText.position.set(27, -40);

        const distanceText = new ZubiloText(`${this.distance} m`).size(74).color('#9ac6ff').withShadow();
        distanceText.anchor.set(0.5, 0.65);
        distanceText.position.set(47, 125);

        const okBtn = new Button(
            this.assets.getTexture(AssetsMapping.ok_button_active),
            this.assets.getTexture(AssetsMapping.ok_button_hover),
            this.assets.getTexture(AssetsMapping.ok_button_press)
        );
        okBtn.anchor.x = 0.5;
        okBtn.y = 298;
        okBtn.onClick(this.controller.onOkBtnClick.bind(this.controller));

        const starL1 = this.makeStar({ x: -500, y: -340 });
        const starL2 = this.makeStar({ x: -582, y: -112 }, 0.8);
        const starL3 = this.makeStar({ x: -597, y: 136 }, 1.5);
        const starL4 = this.makeStar({ x: -500, y: 377 });
        const starR1 = this.makeStar({ x: 500, y: -340 });
        const starR2 = this.makeStar({ x: 582, y: -112 }, 1.5);
        const starR3 = this.makeStar({ x: 550, y: 136 }, 0.8);
        const starR4 = this.makeStar({ x: 550, y: 377 });

        this.rotateStarToLeft([starL1, starL2, starR3, starR4]);
        this.rotateStarToRight([starL3, starL4, starR1, starR2]);

        backgroundSprite.addChild(okBtn, coinsText, distanceText, starL1, starL2, starL3, starL4, starR1, starR2, starR3, starR4);

        return this.content;
    }

    private makeStar(position: IPointData, scale: number = 1) {
        const newStar = this.assets.getSprite(AssetsMapping.star);
        newStar.anchor.set(0.5);
        newStar.scale.set(scale);
        newStar.position = position;
        return newStar;
    }

    rotateStarToLeft(sprites: Sprite[] | Sprite) {
        gsap.to(sprites, { rotation: -0.1, duration: 2, onComplete: () => this.rotateStarToRight(sprites) });
    }

    rotateStarToRight(sprites: Sprite[] | Sprite) {
        gsap.to(sprites, { rotation: 0.1, duration: 2, ease: "power1.inOut", onComplete: () => this.rotateStarToLeft(sprites) });
    }

    destroyContent(): void {
        gsap.globalTimeline.getChildren().forEach(c => c.kill())
        super.destroyContent();
    }
}