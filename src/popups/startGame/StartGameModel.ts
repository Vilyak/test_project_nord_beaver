import { BaseModel } from "../../mvc/BaseModel";
import { NotifyProperty } from "../../mvc/decorators/NotifyProperty";

export class StartGameModel extends BaseModel {

    @NotifyProperty
    private score: number;

    @NotifyProperty
    private username: string;

    constructor(params?: Record<string, any>) {
        super(params);

        this.score = 112;
        this.username = 'Guest_6714';
    }
}