import { BaseModel } from "../../mvc/BaseModel";
import { NotifyProperty } from "../../mvc/decorators/NotifyProperty";

export class GameEndModel extends BaseModel {

    @NotifyProperty
    private coins?: number;

    @NotifyProperty
    private score?: number;

    @NotifyProperty
    private distance?: number;

    constructor(params?: Record<string, any>) {
        super(params);

        this.coins = params?.coins;
        this.score = params?.score;
        this.distance = params?.distance;
    }
}