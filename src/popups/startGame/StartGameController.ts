import { Popups } from "../..";
import { BaseController } from "../../mvc/BaseController";
import { GameState } from "../../scenes/game/GameModel";
import { StartGameModel } from "./StartGameModel";

export class StartGameController<StartGameView> extends BaseController<StartGameView, StartGameModel> {

    public onLoginBtnClick() {
        console.log('Redirect to login page!');
    }

    public onLeaderBoardBtnClick() {
        this.sceneManager.showPopup(Popups.LeaderBoard);
    }

    public onPlayBtnClick() {
        this.sceneManager.closeCurrentPopup({ state: GameState.Idle });
    }
}