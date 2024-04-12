import { Popups } from "../..";
import { BaseController } from "../../mvc/BaseController";
import { LeaderBoardModel } from "./LeaderBoardModel";

export class LeaderBoardController<LeaderBoardView> extends BaseController<LeaderBoardView, LeaderBoardModel> {

    onViewReady() {
        this.model.setDefaultValues();
    }

    public onPrevBtnClick() {
        this.model.prevLeaderBoard();
    }

    public onNextBtnClick() {
        this.model.nextLeaderboard();
    }

    public onOkBtnClick() {
        this.sceneManager.showPopup(Popups.StartGame);
    }
}