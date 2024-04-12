export interface IBaseModel { }

export class BaseModel implements IBaseModel {

    constructor(
        private readonly params?: Record<string, any>,
    ) { }
}

