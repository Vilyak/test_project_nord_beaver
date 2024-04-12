import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping } from "../..";
import { OnChangePropHandler } from "../../mvc/decorators/OnChangePropHandler";
import { Button } from "../../common/components/Button";
import { StartGameController } from "./StartGameController";
import { ZubiloText } from "../../common/components/ZubiloText";

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

        const backgroundSprite = this.assets.getSprite(AssetsMapping.infoPlateBig);

        backgroundSprite.height = 600;
        backgroundSprite.width = 490;

        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = this.app.screen.width / 2;
        backgroundSprite.y = this.app.screen.height / 2;

        const title = new ZubiloText('You records:').size(60).color('#003d71');
        title.anchor.set(0.5, 0.65);

        const bestScore = new ZubiloText('Best score:').size(60).color('#00fd17').withShadow();
        bestScore.anchor.set(0.5);
        bestScore.position.y = 100;

        const scoreResult = new ZubiloText(this.score).size(60).color('#00fd17').withShadow();
        scoreResult.anchor.set(0.5);
        scoreResult.position.y = 170;

        const backgroundTitleSprite = this.assets.getSprite(AssetsMapping.titleBack);
        backgroundTitleSprite.anchor.set(0.5);
        backgroundTitleSprite.position.set(0, -410);

        backgroundSprite.addChild(backgroundTitleSprite);

        console.log(backgroundSprite);

        backgroundTitleSprite.addChild(title);

        backgroundTitleSprite.addChild(bestScore);
        backgroundTitleSprite.addChild(scoreResult);

        const orangeBtn = new Button(
            this.assets.getTexture(AssetsMapping.login_button_active),
            this.assets.getTexture(AssetsMapping.login_button_hover),
            this.assets.getTexture(AssetsMapping.login_button_press)
        );
        orangeBtn.y = 180;
        orangeBtn.anchor.set(0.5);

        orangeBtn.onClick(this.controller.onLoginBtnClick);

        scoreResult.addChild(orangeBtn);

        const userNameBar = this.assets.getSprite(AssetsMapping.user_name_bar);
        userNameBar.anchor.set(0.5);
        userNameBar.y = 100;
        backgroundSprite.addChild(userNameBar);

        const userName = new ZubiloText(this.username).size(50).color('white');
        userName.anchor.set(1, 0.5);
        userNameBar.addChild(userName);

        const leaderBoardBtn = new Button(
            this.assets.getTexture(AssetsMapping.leadboard_button_active),
            this.assets.getTexture(AssetsMapping.leadboard_button_hover),
            this.assets.getTexture(AssetsMapping.leadboard_button_press)
        );

        leaderBoardBtn.anchor.set(1, 0);
        leaderBoardBtn.y = 100;

        leaderBoardBtn.onClick(this.controller.onLeaderBoardBtnClick.bind(this.controller));

        const playBtn = new Button(
            this.assets.getTexture(AssetsMapping.play_button_active),
            this.assets.getTexture(AssetsMapping.play_button_hover),
            this.assets.getTexture(AssetsMapping.play_button_press)
        );
        playBtn.anchor.set(0);
        playBtn.y = 100;

        playBtn.onClick(this.controller.onPlayBtnClick.bind(this.controller));

        userNameBar.addChild(leaderBoardBtn, playBtn);
        this.content.addChild(backgroundSprite);

        return this.content;
    }
}