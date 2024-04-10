import { Application, Container, DisplayObject } from "pixi.js";
import { BaseModel } from "./BaseModel";
import { SceneManager } from "../common/SceneManager";
import { AssetsProvider } from "../common/AssetsProvider";
import { EventEmitter } from "../common/EventEmitter";

export interface IBaseView {
    content: Container;

    destroyContent: () => void;

    render: () => Container;
}

export class BaseView implements IBaseView {

    content: Container<DisplayObject>;

    constructor(
        protected model: BaseModel,
        protected readonly sceneManager: SceneManager<BaseView, BaseModel>,
        protected readonly assets: AssetsProvider,
        protected readonly app: Application,
    ) {
        this.content = new Container();
    }

    render(): Container {
        return this.content;
    }

    destroyContent() {
        this.content.destroy({
            children: true
        });
    }

    closeView() {
        this.sceneManager.closeCurrentScene();
    }

    static subscribeToPropertyChange(modelProperty: string) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;

            EventEmitter.Instance.on(`on${modelProperty}Change`, (newValue: any) => {
                originalMethod(newValue);
            })
        };
    }
}