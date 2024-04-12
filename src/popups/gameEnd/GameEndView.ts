import { Sprite, Text } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping } from "../..";
import { OnChangePropHandler } from "../../mvc/decorators/OnChangePropHandler";
import { Button } from "../../common/components/Button";
import { GameEndController } from "./GameEndController";
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

        const background = this.assets.getTexture(AssetsMapping.infoPlateBig);
        const backgroundSprite = new Sprite(background);
        this.content.sortableChildren = true;

        backgroundSprite.height = 600;
        backgroundSprite.width = 490;

        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = this.app.screen.width / 2;
        backgroundSprite.y = this.app.screen.height / 2;
        backgroundSprite.zIndex = 2;

        const title = new Text('New Record:', { fontFamily: 'Zubilo', fontSize: 60, fill: '#003d71' });
        title.anchor.set(0.5, 0.65);

        const scoleFontStyles = { fontFamily: 'Zubilo', fontSize: 184, fill: '#00fd17', dropShadow: true, dropShadowAlpha: 0.5, dropShadowAngle: 0.95, dropShadowDistance: 6 };
        const scoreResult = new Text(this.score, scoleFontStyles);
        scoreResult.anchor.set(0.5);
        scoreResult.position.y = 150;

        const backgroundTitle = this.assets.getTexture(AssetsMapping.titleBack);
        const backgroundTitleSprite = new Sprite(backgroundTitle);
        backgroundTitleSprite.anchor.set(0.5);

        console.log(backgroundSprite.height)
        backgroundTitleSprite.position.set(0, -410);

        backgroundSprite.addChild(backgroundTitleSprite);

        backgroundTitleSprite.addChild(title);
        backgroundTitleSprite.addChild(scoreResult);

        this.content.addChild(backgroundSprite);

        const coin = this.assets.getSprite(AssetsMapping.collect_coin_icon);
        coin.anchor.set(0.5);
        coin.position.set(-220, -50);

        const distanceIcon = this.assets.getSprite(AssetsMapping.collect_distance_icon);
        distanceIcon.anchor.set(0.5);
        distanceIcon.position.set(-220, 120)

        backgroundSprite.addChild(coin);
        backgroundSprite.addChild(distanceIcon);

        const coinsFontStyle = { fontFamily: 'Zubilo', fontSize: 74, fill: '#f4ad25', dropShadow: true, dropShadowAlpha: 0.5, dropShadowAngle: 0.95, dropShadowDistance: 6 };
        const coinsText = new Text(this.coins, coinsFontStyle);
        coinsText.anchor.set(0.5, 0.65);
        coinsText.position.set(27, -40);

        const distanceTextStyle = { fontFamily: 'Zubilo', fontSize: 74, fill: '#9ac6ff', dropShadow: true, dropShadowAlpha: 0.5, dropShadowAngle: 0.95, dropShadowDistance: 6 };
        const distanceText = new Text(`${this.distance} m`, distanceTextStyle);
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

        const starL1 = this.assets.getSprite(AssetsMapping.star);
        starL1.anchor.set(0.5);
        starL1.position.set(-500, -340);

        const starL2 = this.assets.getSprite(AssetsMapping.star);
        starL2.anchor.set(0.5);
        starL2.scale.set(0.8);
        starL2.position.set(-582, -112);

        const starL3 = this.assets.getSprite(AssetsMapping.star);
        starL3.anchor.set(0.5);
        starL3.scale.set(1.5);
        starL3.position.set(-597, 136);

        const starL4 = this.assets.getSprite(AssetsMapping.star);
        starL4.anchor.set(0.5);
        starL4.position.set(-500, 377);

        const starR1 = this.assets.getSprite(AssetsMapping.star);
        starR1.anchor.set(0.5);
        starR1.position.set(500, -340);

        const starR2 = this.assets.getSprite(AssetsMapping.star);
        starR2.anchor.set(0.5);
        starR2.scale.set(1.5);
        starR2.position.set(582, -112);

        const starR3 = this.assets.getSprite(AssetsMapping.star);
        starR3.anchor.set(0.5);
        starR3.scale.set(1.5);
        starR3.scale.set(0.8);
        starR3.position.set(550, 136);

        const starR4 = this.assets.getSprite(AssetsMapping.star);
        starR4.anchor.set(0.5);
        starR4.position.set(500, 377);

        this.rotateStarToLeft([starL1, starL2, starR3, starR4]);
        this.rotateStarToRight([starL3, starL4, starR1, starR2]);

        backgroundSprite.addChild(okBtn);
        backgroundSprite.addChild(coinsText);
        backgroundSprite.addChild(distanceText);

        backgroundSprite.addChild(starL1, starL2, starL3, starL4, starR1, starR2, starR3, starR4);

        return this.content;
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