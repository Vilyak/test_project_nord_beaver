import { Application, ColorSource } from "pixi.js";
import { AssetsProvider } from "./AssetsProvider";
import { RegisteredScene, SceneManager } from "./SceneManager";
import { BaseModel } from "../mvc/BaseModel";
import { BaseView, IBaseView } from "../mvc/BaseView";
import { Controller } from "../mvc/BaseController";
import PixiPlugin from "gsap/PixiPlugin";
import gsap from "gsap";

export class AppBuidler {

    private assetsProvider: AssetsProvider;
    private readonly app: Application;
    private readonly sceneManager: SceneManager<BaseView<Controller>, BaseModel>;
    private firstScene?: string;

    constructor() {
        this.app = new Application();
        (globalThis as any).__PIXI_APP__ = this.app;
        this.assetsProvider = new AssetsProvider({});
        gsap.registerPlugin(PixiPlugin);
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

    setScenes(scenes: RegisteredScene<IBaseView, BaseModel>[]) {
        this.sceneManager.init(scenes, this.assetsProvider);

        return this;
    }

    setAssets(assets: Record<string, string>) {
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