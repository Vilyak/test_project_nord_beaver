import { Application } from "pixi.js";
import { BaseController, Controller } from "../mvc/BaseController";
import { BaseModel } from "../mvc/BaseModel";
import { BaseView } from "../mvc/BaseView";
import { AssetsProvider } from "./AssetsProvider";

export type RegisteredScene<IBaseView, TModel extends BaseModel> = {
    sceneName: string;
    controllerType: new (m: any, sceneManager: SceneManager<IBaseView, TModel>) => BaseController<BaseView<Controller>, BaseModel>;
    modelType: new (p?: Record<string, any>) => TModel;
    viewType: new (...args: any[]) => BaseView<Controller>;
}

type Scene<IBaseView, TModel extends BaseModel> = {
    controller: BaseController<BaseView<Controller>, BaseModel>;
    view: BaseView<Controller>;
} & Pick<RegisteredScene<IBaseView, TModel>, 'sceneName'>

export class SceneManager<IBaseView, TModel extends BaseModel> {

    private registeredScenes: RegisteredScene<IBaseView, TModel>[];

    private returnedPopupCallback: ((params?: Record<string, any>) => void) | undefined;

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
                this.openedScenes = this.openedScenes.filter(({ sceneName }) => sceneName !== name);
                return;
            }

            throw new Error('Scene not found!');
        }
    }

    isNowPopupOpened() {
        return !!this.currentPopup;
    }

    showScene(sceneName: string, params?: Record<string, any>, isAdditive?: boolean) {
        const registeredScene = this.registeredScenes.find(scene => scene.sceneName === sceneName);

        if (registeredScene) {
            const model = new registeredScene.modelType(params);

            const controller = new registeredScene.controllerType(model, this);

            const view = new registeredScene.viewType(model, controller, this.assetsProvider, this.app);

            this.openedScenes.push({
                sceneName,
                controller,
                view
            });

            const content = view.render();

            this.app.stage.sortableChildren = true;
            this.app.stage.addChild(content);

            controller.onViewReady();

            if (!isAdditive) {
                this.closeCurrentScene();

                this.currentScene = sceneName;
            }
            else {
                content.zIndex = 1;
            }

            return model;
        }

        throw new Error('That scene is not registered!');
    }

    closeCurrentScene() {
        this.removeScene(this.currentScene);
        this.currentScene = undefined;
    }

    closeCurrentPopup(params?: Record<string, any>) {
        this.removeScene(this.currentPopup);
        this.returnedPopupCallback?.(params);
        this.returnedPopupCallback = undefined;
        this.currentPopup = undefined;
    }

    showPopup(popupName: string, params?: Record<string, any>, onClose?: (params?: Record<string, any>) => void) {
        this.closeCurrentPopup();
        this.currentPopup = popupName;
        this.returnedPopupCallback = onClose;
        return this.showScene(popupName, params, true);
    }
}