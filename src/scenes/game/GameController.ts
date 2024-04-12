import { Popups } from "../..";
import { BaseController } from "../../mvc/BaseController";
import { GameModel, GameState } from "./GameModel";

export class GameController<GameView> extends BaseController<GameView, GameModel> {
    onStart() {
        this.sceneManager.showPopup(Popups.StartGame);
        document.addEventListener('keydown', (key: any) => this.onKeyDown(key));
    }

    onKeyDown(key: any) {
        if (key.keyCode === 32 && !this.sceneManager.isNowPopupOpened()) {
            this.model.onUserClick();
        }
    }

    onGameEnd(distance: number) {
        this.model.setState(GameState.Ended);
        const score = Math.round(distance / 10);
        this.sceneManager.showPopup(Popups.GameEnd, { distance: score, coins: 0, score });
        this.model.setState(GameState.Idle);
    }

    onSoundDisable() {
        this.model.soundToogle(false);
        console.log('Sound disable');
    }

    onSoundEnable() {
        this.model.soundToogle(true);
        console.log('Sound enabled');
    }
}