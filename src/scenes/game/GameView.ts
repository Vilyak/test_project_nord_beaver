import { Application, Container, DisplayObject, Sprite, Text } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping, Popups, Scenes } from "../..";
import { GameController } from "./GameController";
import { Button } from "../../common/components/Button";
import { AssetsProvider } from "../../common/AssetsProvider";
import { BaseModel } from "../../mvc/BaseModel";
import { GameModel, GameState } from "./GameModel";
import { DynamicEnvironment } from "./DynamicEnvironment";
import { Player } from "./Player";
import gsap from "gsap";

export class GameView extends BaseView<GameController<GameView>> {

    private coinsText?: Text;
    private soundEnableBtn?: Button;
    private soundDisableBtn?: Button;

    private environment: DynamicEnvironment;
    private player: Player;

    constructor(
        protected model: GameModel,
        protected controller: GameController<GameView>,
        protected readonly assets: AssetsProvider,
        protected readonly app: Application,
    ) {
        super(model, controller, assets, app);
        this.environment = new DynamicEnvironment(this.app.ticker, this.assets.getTexture(AssetsMapping.floor));
        this.player = new Player(this.assets.getSprite(AssetsMapping.bunny));
    }

    protected async onStart(): Promise<void> {
        this.onChangeModelVariable('soundEnabled', this.onChangeSoundMode.bind(this));
        this.onChangeModelVariable('gameState', (state) => this.onChangeGameState(state));
    }

    private endGameHandler(player: Player) {
        return () => {
            if (!this.player.endedTween && this.environment.sumDelta >= 8000) {
                this.player.endAnimation(this.environment.getSlope(), () => {
                    this.app.ticker.remove(this.endGameHandler(player));
                    this.player.setInitialPositions();
                    this.controller.onGameEnd(this.environment.sumDelta);
                })
            }
        }
    }

    onChangeGameState(gameState: GameState) {
        if (gameState === GameState.inProgress) {
            this.app.ticker.add(this.endGameHandler(this.player));
            this.player.start();
        }

        if (gameState === GameState.Ended) {
            gsap.globalTimeline.getChildren().forEach(c => c.kill());
            this.app.ticker.remove(this.endGameHandler(this.player));
        }
        this.environment.onChangeState(gameState);
    }

    onChangeSoundMode(soundEnabled: boolean) {
        if (soundEnabled) {
            this.soundEnableBtn?.setVisible(false);
            this.soundDisableBtn?.setVisible(true);
        } else {
            this.soundEnableBtn?.setVisible(true);
            this.soundDisableBtn?.setVisible(false);
        }
    }

    upperPanel() {
        const coinsBack = this.assets.getSprite(AssetsMapping.coin_score_plate);
        coinsBack.position.set(40, 27);

        const coinIcon = this.assets.getSprite(AssetsMapping.collect_coin_icon);
        coinsBack.addChild(coinIcon);
        coinIcon.scale.set(0.85);
        coinIcon.anchor.set(0.5, 0);
        coinIcon.position.set(15, -4);

        this.coinsText = new Text(0, { fontFamily: 'Zubilo', fontSize: 48, fill: 'white' });
        this.coinsText.anchor.set(0.5);
        this.coinsText.position.set(113, 32);

        coinsBack.addChild(this.coinsText);

        const fullScreanBtn = new Button(
            this.assets.getTexture(AssetsMapping.btn_fullscreen_active),
            this.assets.getTexture(AssetsMapping.btn_fullscreen_hover),
            this.assets.getTexture(AssetsMapping.btn_fullscreen_press),
        );
        fullScreanBtn.anchor.x = 1;
        fullScreanBtn?.scale.set(0.8);
        fullScreanBtn.position.set(this.app.view.width - 230, 15);

        this.soundEnableBtn = new Button(
            this.assets.getTexture(AssetsMapping.btn_sound_1_active),
            this.assets.getTexture(AssetsMapping.btn_sound_1_hover),
            this.assets.getTexture(AssetsMapping.btn_sound_1_press),
        );
        this.soundEnableBtn.anchor.x = 1;
        this.soundEnableBtn.scale.set(0.8);
        this.soundEnableBtn.position.set(this.app.view.width - 120, 15);
        this.soundEnableBtn.onClick(this.controller.onSoundEnable.bind(this.controller));

        this.soundDisableBtn = new Button(
            this.assets.getTexture(AssetsMapping.btn_sound_0_active),
            this.assets.getTexture(AssetsMapping.btn_sound_0_hover),
            this.assets.getTexture(AssetsMapping.btn_sound_0_press),
        );
        this.soundDisableBtn.anchor.x = 1;
        this.soundDisableBtn.scale.set(0.8);
        this.soundDisableBtn.position.set(this.app.view.width - 120, 15);
        this.soundDisableBtn.onClick(this.controller.onSoundDisable.bind(this.controller));

        const pauseBtn = new Button(
            this.assets.getTexture(AssetsMapping.btn_pause_active),
            this.assets.getTexture(AssetsMapping.btn_pause_hover),
            this.assets.getTexture(AssetsMapping.btn_pause_press),
        );
        pauseBtn.anchor.x = 1;
        pauseBtn.scale.set(0.8);
        pauseBtn.position.set(this.app.view.width - 15, 15);

        return [coinsBack, pauseBtn, this.soundDisableBtn, this.soundEnableBtn, fullScreanBtn];
    }

    render(): Container<DisplayObject> {

        const backgroundTexture = this.assets.getTexture(AssetsMapping.bgGradient);
        const backMountations = this.assets.getTexture(AssetsMapping.backMountations);

        const background = new Sprite(backgroundTexture);
        const mountations1 = new Sprite(backMountations);
        const mountations2 = new Sprite(backMountations);
        mountations1.anchor.set(0, -0.8);
        mountations2.anchor.set(0, -0.8);

        mountations1.height = 385;
        mountations1.width = 640;

        mountations1.scale.set(0.5);
        mountations2.scale.set(0.5);

        mountations2.x = mountations1._width;

        background.width = this.app.view.width;
        background.height = this.app.view.height;

        this.content.addChild(background, mountations1, mountations2, ...this.upperPanel());

        this.content.addChild(this.player.build(), this.environment.build());



        return this.content;
    }
}