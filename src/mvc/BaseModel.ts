export interface IBaseModel { }

export class BaseModel implements IBaseModel {
    private subscribers: { [key: string]: Function[] } = {};

    public get Subscribes() {
        return this.subscribers;
    }

    constructor(
        private readonly params?: Record<string, any>,
    ) { }
}

