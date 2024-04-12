import { Popups } from "../..";
import { BaseController } from "../../mvc/BaseController";
import { GameEndModel } from "./GameEndModel";

export class GameEndController<GameEndView> extends BaseController<GameEndView, GameEndModel> {

    public onOkBtnClick() {
        this.sceneManager.showPopup(Popups.StartGame);
    }
}