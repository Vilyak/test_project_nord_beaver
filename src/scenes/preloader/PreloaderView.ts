import { Container, DisplayObject, Sprite } from "pixi.js";
import { BaseView } from "../../mvc/BaseView";
import { AssetsMapping, Scenes } from "../..";
import { PreloaderController } from "./PreloaderController";

export class PreloaderView extends BaseView<PreloaderController<PreloaderView>> {

    protected async onStart() {
        await this.assets.preloadAssets();

        this.controller.onLoadedAssets();
    }

    render(): Container<DisplayObject> {

        const bg = this.assets.getSprite(AssetsMapping.bg_preloader);

        bg.anchor.set(0.5);
        bg.x = this.app.screen.width / 2;
        bg.y = this.app.screen.height / 2;

        const bunny = this.assets.getTexture(AssetsMapping.bunny);

        const bunnySprite = new Sprite(bunny);
        bunnySprite.scale.set(0.3);
        bunnySprite.anchor.set(0.5);
        bunnySprite.x = this.app.screen.width / 2;
        bunnySprite.y = this.app.screen.height / 2;

        this.content.addChild(bg);
        this.content.addChild(bunnySprite);

        return this.content;
    }
}