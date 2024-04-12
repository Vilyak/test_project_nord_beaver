import { Application, Container, DisplayObject } from "pixi.js";
import { BaseModel } from "./BaseModel";
import { AssetsProvider } from "../common/AssetsProvider";
import { BaseController } from "./BaseController";
import { EventEmitter } from "../common/EventEmitter";

export interface IBaseView {
    content: Container;

    destroyContent: () => void;

    render(): Container;
}

export class BaseView<C extends BaseController<IBaseView, BaseModel>> implements IBaseView {

    content: Container<DisplayObject>;

    constructor(
        protected model: BaseModel,
        protected controller: C,
        protected readonly assets: AssetsProvider,
        protected readonly app: Application,
    ) {
        this.content = new Container();
        this.onStart();
    }

    protected async onStart() { }

    render(): Container {
        return this.content;
    }

    destroyContent() {
        this.content.destroy({
            children: true
        });
    }

    onChangeModelVariable(variableName: string, callback: (newValue: any) => void) {
        EventEmitter.Instance.on(`on${variableName}Change`, callback);
    }
}