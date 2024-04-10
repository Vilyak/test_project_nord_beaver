import { Application, Container, DisplayObject, Sprite } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsProvider } from "../../common/AssetsProvider";
import { SceneManager } from "../../common/SceneManager";
import { BaseModel } from "../../mvc/BaseModel";
import { AssetsMapping, Scenes } from "../..";

export class PreloaderView extends BaseView {

    constructor(
        protected model: BaseModel,
        protected readonly sceneManager: SceneManager<BaseView, BaseModel>,
        protected readonly assets: AssetsProvider,
        protected readonly app: Application,
    ) {
        super(model, sceneManager, assets, app);
        this.init();
    }

    async init() {
        await this.assets.preloadAssets();

        this.sceneManager.showScene(Scenes.Game);
    }

    render(): Container<DisplayObject> {

        const bunny = this.assets.getTexture(AssetsMapping.bunny);

        const bunnySprite = new Sprite(bunny)
        bunnySprite.anchor.set(0.5);
        bunnySprite.x = this.app.screen.width / 2
        bunnySprite.y = this.app.screen.height / 2

        this.content.addChild(bunnySprite);

        return this.content;
    }
}