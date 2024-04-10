import { BaseModel } from "../../mvc/BaseModel";
import { NotifyPropery } from "../../mvc/decorators/NotifyProperty";

export class PreloaderModel extends BaseModel {

    constructor(params?: Record<string, any>) {
        super(params);
    }
}