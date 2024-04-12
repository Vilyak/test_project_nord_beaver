import { SceneManager } from "../common/SceneManager";
import { BaseModel, IBaseModel } from "./BaseModel";
import { IBaseView } from "./BaseView";

export class BaseController<IBaseView, TModel extends BaseModel> {

    constructor(
        protected readonly model: TModel,
        protected readonly sceneManager: SceneManager<IBaseView, IBaseModel>
    ) {
        this.onStart();
    }

    onStart() { }

    onViewReady() { }
}

export type Controller = BaseController<IBaseView, IBaseModel>;