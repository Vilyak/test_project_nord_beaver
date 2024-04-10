import { Application } from "pixi.js";
import { BaseController } from "../mvc/BaseController";
import { BaseModel } from "../mvc/BaseModel";
import { BaseView } from "../mvc/BaseView";
import { AssetsProvider } from "./AssetsProvider";

export type RegisteredScene<IBaseView, TModel extends BaseModel> = {
    sceneName: string;
    controllerType: new (m: TModel, v: IBaseView) => BaseController<BaseView, BaseModel>;
    modelType: new (p?: Record<string, any>) => TModel;
    viewType: new (m: TModel, sceneManager: SceneManager<IBaseView, TModel>, assets: AssetsProvider, app: Application) => BaseView;
}

type Scene<IBaseView, TModel extends BaseModel> = {
    controller: BaseController<BaseView, BaseModel>;
    view: BaseView;
} & Pick<RegisteredScene<IBaseView, TModel>, 'sceneName'>

export class SceneManager<IBaseView, TModel extends BaseModel> {

    private registeredScenes: RegisteredScene<IBaseView, TModel>[];

    private currentScene: string | undefined;
    private currentPopup: string | undefined;
    private openedScenes: Scene<IBaseView, TModel>[];
    private assetsProvider: AssetsProvider;

    constructor(private readonly app: Application, assetsProvider: AssetsProvider) {
        this.openedScenes = [];
        this.registeredScenes = [];
        this.assetsProvider = assetsProvider;
    }

    init(registeredScenes: RegisteredScene<IBaseView, TModel>[], assetsProvider: AssetsProvider) {
        this.registeredScenes = registeredScenes;
    }

    private removeScene(name?: string) {
        if (name) {
            const scene = this.openedScenes.find(({ sceneName }) => sceneName === name);

            if (scene) {
                scene.view.destroyContent();

                return;
            }

            throw new Error('Scene not found!');
        }
    }

    showScene(sceneName: string, params?: Record<string, any>, isAdditive?: boolean) {
        const registeredScene = this.registeredScenes.find(scene => scene.sceneName === sceneName);

        if (registeredScene) {
            const model = new registeredScene.modelType(params);

            const view = new registeredScene.viewType(model, this, this.assetsProvider, this.app);

            const controller = new registeredScene.controllerType(model, view as IBaseView);

            this.openedScenes.push({
                sceneName,
                controller,
                view
            });

            this.app.stage.addChild(view.render());

            if (!isAdditive) {
                this.closeCurrentScene();

                this.currentScene = sceneName;
            }

            return;
        }

        throw new Error('That scene is not registered!');
    }

    closeCurrentScene() {
        this.removeScene(this.currentScene);
        this.currentScene = undefined;
    }

    closeCurrentPopup() {
        this.removeScene(this.currentPopup);
        this.currentPopup = undefined;
    }

    showPopup(popupName: string, params?: Record<string, any>) {
        this.showScene(popupName, params, true);
        this.currentPopup = popupName;
    }
}