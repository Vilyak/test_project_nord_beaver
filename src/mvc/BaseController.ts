export class BaseController<IBaseView, IBaseModel> {

    constructor(
        private readonly model: IBaseModel,
        private readonly view: IBaseView,
    ) { }
}