import { EventEmitter } from "../../common/EventEmitter";
import { BaseModel } from "../../mvc/BaseModel";
import { NotifyProperty } from "../../mvc/decorators/NotifyProperty";

export enum GameState {
    Idle,
    inProgress,
    Ended,
}

export class GameModel extends BaseModel {

    @NotifyProperty
    private gameState: GameState;

    @NotifyProperty
    private coinValue: number;

    @NotifyProperty
    private soundEnabled: boolean;

    constructor(params?: Record<string, any>) {
        super(params);

        this.gameState = GameState.Idle;
        this.coinValue = 0;
        this.soundEnabled = true;
    }

    soundToogle(value: boolean) {
        this.soundEnabled = value;
    }

    setState(gameState: GameState) {
        this.gameState = gameState;
    }

    onUserClick() {
        if (this.gameState === GameState.inProgress) {
            EventEmitter.Instance.emit('jump');
        }

        if (this.gameState === GameState.Idle) {
            this.gameState = GameState.inProgress;
        }
    }
}