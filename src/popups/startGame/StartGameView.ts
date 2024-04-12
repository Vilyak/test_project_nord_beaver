import { Container, DisplayObject, Sprite, Text } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping } from "../..";
import { OnChangePropHandler } from "../../mvc/decorators/OnChangePropHandler";
import { Button } from "../../common/components/Button";
import { StartGameController } from "./StartGameController";

export class StartGameView extends BaseView<StartGameController<StartGameView>> {

    private score: number | undefined;
    private username: number | undefined;

    @OnChangePropHandler('score')
    onChangeScore(score: number) {
        this.score = score;
    }

    @OnChangePropHandler('username')
    onChangeUserName(username: number) {
        this.username = username;
    }

    render() {

        const background = this.assets.getTexture(AssetsMapping.infoPlateBig);
        const backgroundSprite = new Sprite(background);

        backgroundSprite.height = 600;
        backgroundSprite.width = 490;

        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = this.app.screen.width / 2;
        backgroundSprite.y = this.app.screen.height / 2;

        const title = new Text('You records:', { fontFamily: 'Zubilo', fontSize: 60, fill: '#003d71' });
        title.anchor.set(0.5, 0.65);

        const scroleFontStyles = { fontFamily: 'Zubilo', fontSize: 60, fill: '#00fd17', dropShadow: true, dropShadowAlpha: 0.5, dropShadowAngle: 0.95, dropShadowDistance: 6 };
        const bestScore = new Text('Best score:', scroleFontStyles);
        bestScore.anchor.set(0.5);
        bestScore.position.y = 100;

        const scoreResult = new Text(this.score, scroleFontStyles);
        scoreResult.anchor.set(0.5);
        scoreResult.position.y = 170;

        const backgroundTitle = this.assets.getTexture(AssetsMapping.titleBack);
        const backgroundTitleSprite = new Sprite(backgroundTitle);
        backgroundTitleSprite.anchor.set(0.5);

        console.log(backgroundSprite.height)
        backgroundTitleSprite.position.set(0, -410);

        backgroundSprite.addChild(backgroundTitleSprite);

        console.log(backgroundSprite);

        backgroundTitleSprite.addChild(title);

        backgroundTitleSprite.addChild(bestScore);
        backgroundTitleSprite.addChild(scoreResult);

        const idleTexture = this.assets.getTexture(AssetsMapping.login_button_active);
        const pressedTexture = this.assets.getTexture(AssetsMapping.login_button_press);
        const hoverTexture = this.assets.getTexture(AssetsMapping.login_button_hover);

        const orangeBtn = new Button(idleTexture, hoverTexture, pressedTexture);
        orangeBtn.y = 180;
        orangeBtn.anchor.set(0.5);

        orangeBtn.onClick(this.controller.onLoginBtnClick);

        scoreResult.addChild(orangeBtn);

        const userNameBarTexture = this.assets.getTexture(AssetsMapping.user_name_bar);
        const userNameBar = new Sprite(userNameBarTexture);
        userNameBar.anchor.set(0.5);
        userNameBar.y = 100;
        backgroundSprite.addChild(userNameBar);

        const userName = new Text(this.username, { fontFamily: 'Zubilo', fontSize: 50, fill: 'white' });
        userName.anchor.set(1, 0.5);

        userNameBar.addChild(userName);

        const leadboardActiveTexture = this.assets.getTexture(AssetsMapping.leadboard_button_active);
        const leadboardPressTexture = this.assets.getTexture(AssetsMapping.leadboard_button_press);
        const leadboardHoverTexture = this.assets.getTexture(AssetsMapping.leadboard_button_hover);

        const leaderBoardBtn = new Button(leadboardActiveTexture, leadboardHoverTexture, leadboardPressTexture);
        leaderBoardBtn.anchor.set(1, 0);
        leaderBoardBtn.y = 100;

        leaderBoardBtn.onClick(this.controller.onLeaderBoardBtnClick.bind(this.controller));

        const playActiveTexture = this.assets.getTexture(AssetsMapping.play_button_active);
        const playPressTexture = this.assets.getTexture(AssetsMapping.play_button_press);
        const playHoverTexture = this.assets.getTexture(AssetsMapping.play_button_hover);

        const playBtn = new Button(playActiveTexture, playHoverTexture, playPressTexture);
        playBtn.anchor.set(0);
        playBtn.y = 100;

        playBtn.onClick(this.controller.onPlayBtnClick.bind(this.controller));

        userNameBar.addChild(leaderBoardBtn);
        userNameBar.addChild(playBtn);

        this.content.addChild(backgroundSprite);

        return this.content;
    }
}