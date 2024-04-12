import { Scenes } from "../..";
import { BaseController } from "../../mvc/BaseController";
import { PreloaderModel } from "./PreloaderModel";

export class PreloaderController<PreloaderView> extends BaseController<PreloaderView, PreloaderModel> {

    public onLoadedAssets() {

        // simulate http requests ;)
        setTimeout(() => {
            this.sceneManager.showScene(Scenes.Game);
        }, 2000);
    }
}