import { Container, Sprite, Text } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping } from "../..";
import { Button } from "../../common/components/Button";
import { LeaderBoardController } from "./LeaderBoardController";
import { LeaderBoardInfo } from "./types";

export class LeaderBoardView extends BaseView<LeaderBoardController<LeaderBoardView>> {

    private leaderBoardName?: Text;
    private currentItems: Container[] = [];
    private backgroundSprite?: Sprite;
    private tasks: NodeJS.Timeout[] = [];

    protected async onStart(): Promise<void> {
        this.tasks = [];
        this.currentItems = [];
        this.onChangeModelVariable('curentleaderBoardInfo', this.onChangeLeaderBoard.bind(this));
    }

    onChangeLeaderBoard(leaderBoardInfo: LeaderBoardInfo) {
        if (this.leaderBoardName) {
            this.leaderBoardName.text = leaderBoardInfo.name;
        }
        this.currentItems.forEach(item => {
            if (!item.destroyed) {
                item.destroy()
            }
        });
        this.tasks.forEach(item => clearTimeout(item));
        this.tasks = [];
        this.currentItems = [];

        const startPositionY = -240;
        let margin = 0;

        leaderBoardInfo.data.forEach(({ username, score }, index) => {
            this.tasks.push(setTimeout(() => {
                const itemHeight = index <= 2 ? 80 : 46;
                const item = index <= 2 ? this.buildLeaderBoardHigherItem(username, score, index + 1)
                    : this.buildLeaderBoardDefaultItem(username, score, index + 1);
                item.position.y = startPositionY + margin;
                margin += itemHeight;
                this.backgroundSprite?.addChild(item);
                this.currentItems.push(item);
            }, 70 * (index + 1)));
        });
    }

    private buildLeaderBoardHigherItem(username: string, score: number, order: number) {
        const colors: Record<number, string> = {
            1: '#c26102',
            2: '#0064c0',
            3: '#8b1b01',
        };

        const backGrounds: Record<number, string> = {
            1: AssetsMapping.leaderboard_place_1,
            2: AssetsMapping.leaderboard_place_2,
            3: AssetsMapping.leaderboard_place_3,
        };

        const textColor = colors[order];
        const backName = backGrounds[order];

        const nameText = new Text(username, { fontFamily: 'Zubilo', fontSize: 40, fill: textColor });
        nameText.anchor.set(0, 0.5);
        nameText.position.set(-165, -3);

        const usernameBack = this.assets.getSprite(backName);
        usernameBack.anchor.set(0.5);
        usernameBack.x = -95;

        const scoreText = new Text(score, { fontFamily: 'Zubilo', fontSize: 32, fill: textColor });
        scoreText.anchor.set(0.5, 0.5);
        scoreText.position.set(245, -3);

        const scoreBack = this.assets.getSprite(AssetsMapping.midleader_scores_plate);
        scoreBack.anchor.set(-1, 0.5);
        scoreBack.x = 105;
        scoreBack.height = 50;

        scoreBack.addChild(scoreText);
        usernameBack.addChild(scoreBack);
        usernameBack.addChild(nameText);

        return usernameBack;
    }

    private buildLeaderBoardDefaultItem(username: string, score: number, order: number) {
        const nameText = new Text(username, { fontFamily: 'Zubilo', fontSize: 32, fill: 'black' });
        nameText.anchor.set(0, 0.5);
        nameText.position.set(-200, -3);

        const usernameBack = this.assets.getSprite(AssetsMapping.midleader_name_plate);
        usernameBack.anchor.set(0.5);
        usernameBack.x = -60;

        const scoreText = new Text(score, { fontFamily: 'Zubilo', fontSize: 32, fill: 'black' });
        scoreText.anchor.set(0.5, 0.5);
        scoreText.position.set(245, -3);

        const scoreBack = this.assets.getSprite(AssetsMapping.midleader_scores_plate);
        scoreBack.anchor.set(-1, 0.5);
        scoreBack.x = 70;

        const orderText = new Text(order, { fontFamily: 'Zubilo', fontSize: 37, fill: 'white' });
        orderText.anchor.set(0.5);
        orderText.position.set(-245, -3);

        scoreBack.addChild(scoreText);
        usernameBack.addChild(scoreBack);
        usernameBack.addChild(orderText);
        usernameBack.addChild(nameText);

        return usernameBack;
    }

    render() {

        const background = this.assets.getTexture(AssetsMapping.infoPlateBig);
        this.backgroundSprite = new Sprite(background);

        this.backgroundSprite.height = 600;
        this.backgroundSprite.width = 490;

        this.backgroundSprite.anchor.set(0.5);
        this.backgroundSprite.x = this.app.screen.width / 2;
        this.backgroundSprite.y = this.app.screen.height / 2;

        const title = new Text('Leaderboard:', { fontFamily: 'Zubilo', fontSize: 60, fill: '#003d71' });
        title.anchor.set(0.5, 0.65);

        const styles = { fontFamily: 'Zubilo', fontSize: 65, fill: '#ff6800', dropShadow: true, dropShadowAlpha: 0.5, dropShadowAngle: 0.95, dropShadowDistance: 6 };
        this.leaderBoardName = new Text(undefined, styles);
        this.leaderBoardName.anchor.set(0.5);
        this.leaderBoardName.position.y = 100;

        const backgroundTitle = this.assets.getTexture(AssetsMapping.titleBack);
        const backgroundTitleSprite = new Sprite(backgroundTitle);
        backgroundTitleSprite.anchor.set(0.5);

        backgroundTitleSprite.position.set(0, -410);

        this.backgroundSprite.addChild(backgroundTitleSprite);

        backgroundTitleSprite.addChild(title);

        backgroundTitleSprite.addChild(this.leaderBoardName);

        this.content.addChild(this.backgroundSprite);

        const prevBtn = new Button(
            this.assets.getTexture(AssetsMapping.arrow_btn_active),
            this.assets.getTexture(AssetsMapping.arrow_btn_hover),
            this.assets.getTexture(AssetsMapping.arrow_btn_press)
        );
        prevBtn.x = -270;
        prevBtn.anchor.set(0.5);
        prevBtn.scale.x *= -1;
        prevBtn.onClick(this.controller.onPrevBtnClick.bind(this.controller));

        this.leaderBoardName.addChild(prevBtn);

        const nextBtn = new Button(
            this.assets.getTexture(AssetsMapping.arrow_btn_active),
            this.assets.getTexture(AssetsMapping.arrow_btn_hover),
            this.assets.getTexture(AssetsMapping.arrow_btn_press)
        );
        nextBtn.x = 270;
        nextBtn.anchor.set(0.5);
        nextBtn.onClick(this.controller.onNextBtnClick.bind(this.controller));

        this.leaderBoardName.addChild(nextBtn);

        const okBtn = new Button(
            this.assets.getTexture(AssetsMapping.ok_button_active),
            this.assets.getTexture(AssetsMapping.ok_button_hover),
            this.assets.getTexture(AssetsMapping.ok_button_press)
        );
        okBtn.anchor.x = 0.5;
        okBtn.y = 298;
        okBtn.onClick(this.controller.onOkBtnClick.bind(this.controller));

        this.backgroundSprite.addChild(okBtn);

        return this.content;
    }
}