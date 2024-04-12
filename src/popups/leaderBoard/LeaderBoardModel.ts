import { BaseModel } from "../../mvc/BaseModel";
import { NotifyProperty } from "../../mvc/decorators/NotifyProperty";
import { MOCK_LEADER_BOARD_DATA } from "./mocks";
import { LeaderBoardInfo } from "./types";

export class LeaderBoardModel extends BaseModel {

    private allLeaderBoard?: LeaderBoardInfo[];

    private currentIndex: number = 0;

    @NotifyProperty
    private curentleaderBoardInfo?: LeaderBoardInfo;

    constructor(params?: Record<string, any>) {
        super(params);
        this.currentIndex = 0;
    }

    setDefaultValues() {
        this.allLeaderBoard = MOCK_LEADER_BOARD_DATA;
        this.curentleaderBoardInfo = this.allLeaderBoard[this.currentIndex];
    }

    nextLeaderboard() {
        if (!this.allLeaderBoard) {
            return;
        }

        this.currentIndex < this.allLeaderBoard?.length - 1 ? this.currentIndex++ : this.currentIndex = 0

        this.curentleaderBoardInfo = this.allLeaderBoard[this.currentIndex];
    }

    prevLeaderBoard() {
        if (!this.allLeaderBoard) {
            return;
        }

        this.currentIndex <= 0 ? this.currentIndex = this.allLeaderBoard?.length - 1 : this.currentIndex--;

        this.curentleaderBoardInfo = this.allLeaderBoard[this.currentIndex];
    }
}