import { Application, ColorSource } from "pixi.js";
import { AssetEntity, AssetsProvider } from "./AssetsProvider";
import { RegisteredScene, SceneManager } from "./SceneManager";
import { BaseModel } from "../mvc/BaseModel";
import { BaseView } from "../mvc/BaseView";

export class AppBuidler {

    private assetsProvider: AssetsProvider;
    private readonly app: Application;
    private readonly sceneManager: SceneManager<BaseView, BaseModel>;
    private firstScene?: string;

    constructor() {
        this.app = new Application();
        this.assetsProvider = new AssetsProvider([]);
        this.sceneManager = new SceneManager(this.app, this.assetsProvider);
    }

    setBackgroundColor(color: ColorSource) {
        this.app.renderer.background.color = color;

        return this;
    }

    setResolution(w: number, h: number) {
        this.app.renderer.resize(w, h);

        return this;
    }

    setScenes(scenes: RegisteredScene<BaseView, BaseModel>[]) {
        this.sceneManager.init(scenes, this.assetsProvider);

        return this;
    }

    setAssets(assets: AssetEntity[]) {
        this.assetsProvider = new AssetsProvider(assets);

        return this;
    }

    setFirstScene(scene: string) {
        this.firstScene = scene;

        return this;
    }

    build() {
        document.getElementById('game')?.appendChild(this.app.view as HTMLCanvasElement);

        if (this.firstScene) {
            this.sceneManager.showScene(this.firstScene);
        }
    }
}