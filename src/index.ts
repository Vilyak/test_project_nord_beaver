import { AppBuidler } from './common/AppBuilder';
import { GameEndController } from './popups/gameEnd/GameEndController';
import { GameEndModel } from './popups/gameEnd/GameEndModel';
import { GameEndView } from './popups/gameEnd/GameEndView';
import { LeaderBoardController } from './popups/leaderBoard/LeaderBoardController';
import { LeaderBoardModel } from './popups/leaderBoard/LeaderBoardModel';
import { LeaderBoardView } from './popups/leaderBoard/LeaderBoardView';
import { StartGameController } from './popups/startGame/StartGameController';
import { StartGameModel } from './popups/startGame/StartGameModel';
import { StartGameView } from './popups/startGame/StartGameView';
import { GameController } from './scenes/game/GameController';
import { GameModel } from './scenes/game/GameModel';
import { GameView } from './scenes/game/GameView';
import { PreloaderController } from './scenes/preloader/PreloaderController';
import { PreloaderModel } from './scenes/preloader/PreloaderModel';
import { PreloaderView } from './scenes/preloader/PreloaderView';

export enum Scenes {
    'Preloader' = 'Preloader',
    'Game' = 'Game',
}

export enum Popups {
    'StartGame' = 'StartGame',
    'LeaderBoard' = 'LeaderBoard',
    'GameEnd' = 'GameEnd',
}

export const AssetsMapping = {
    bunny: 'assets/bunny.png',
    bgGradient: 'assets/bg_gradient.png',
    backMountations: 'assets/backMountations.png',
    infoPlateBig: 'assets/info_plate_big.png',
    font: 'assets/fonts/ZubiloBlack.woff',
    titleBack: 'assets/titleBack.png',
    login_button_active: 'assets/login_button_active.png',
    login_button_press: 'assets/login_button_press.png',
    login_button_hover: 'assets/login_button_hover.png',
    user_name_bar: 'assets/user_name_bar.png',
    leadboard_button_active: 'assets/leadboard_button_active.png',
    leadboard_button_hover: 'assets/leadboard_button_hover.png',
    leadboard_button_press: 'assets/leadboard_button_press.png',
    play_button_active: 'assets/play_button_active.png',
    play_button_hover: 'assets/play_button_hover.png',
    play_button_press: 'assets/play_button_press.png',
    arrow_btn_active: 'assets/arrow_btn_active.png',
    arrow_btn_hover: 'assets/arrow_btn_hover.png',
    arrow_btn_press: 'assets/arrow_btn_press.png',
    leaderboard_place_1: 'assets/leaderboard_place_1.png',
    leaderboard_place_2: 'assets/leaderboard_place_2.png',
    leaderboard_place_3: 'assets/leaderboard_place_3.png',
    midleader_name_plate: 'assets/midleader_name_plate.png',
    midleader_scores_plate: 'assets/midleader_scores_plate.png',
    highleader_scores_plate: 'assets/highleader_scores_plate.png',
    ok_button_active: 'assets/ok_button_active.png',
    ok_button_hover: 'assets/ok_button_hover.png',
    ok_button_press: 'assets/ok_button_press.png',
    collect_coin_icon: 'assets/collect_coin_icon.png',
    collect_distance_icon: 'assets/collect_distance_icon.png',
    rays: 'assets/rays.png',
    star: 'assets/star.png',
    coin_score_plate: 'assets/coin_score_plate.png',
    btn_fullscreen_active: 'assets/btn_fullscreen_active.png',
    btn_fullscreen_hover: 'assets/btn_fullscreen_hover.png',
    btn_fullscreen_press: 'assets/btn_fullscreen_press.png',
    btn_pause_active: 'assets/btn_pause_active.png',
    btn_pause_hover: 'assets/btn_pause_hover.png',
    btn_pause_press: 'assets/btn_pause_press.png',
    btn_sound_0_active: 'assets/btn_sound_0_active.png',
    btn_sound_0_hover: 'assets/btn_sound_0_hover.png',
    btn_sound_0_press: 'assets/btn_sound_0_press.png',
    btn_sound_1_active: 'assets/btn_sound_1_active.png',
    btn_sound_1_hover: 'assets/btn_sound_1_hover.png',
    btn_sound_1_press: 'assets/btn_sound_1_press.png',
    floor: 'assets/floor.png',
} as const;


new AppBuidler()
    .setAssets(AssetsMapping)
    .setScenes([
        { sceneName: Scenes.Preloader, controllerType: PreloaderController, modelType: PreloaderModel, viewType: PreloaderView },
        { sceneName: Scenes.Game, controllerType: GameController, modelType: GameModel, viewType: GameView },
        { sceneName: Popups.StartGame, controllerType: StartGameController, modelType: StartGameModel, viewType: StartGameView },
        { sceneName: Popups.LeaderBoard, controllerType: LeaderBoardController, modelType: LeaderBoardModel, viewType: LeaderBoardView },
        { sceneName: Popups.GameEnd, controllerType: GameEndController, modelType: GameEndModel, viewType: GameEndView }
    ])
    .setBackgroundColor(0x1099bb)
    .setResolution(1280, 640)
    .setFirstScene(Scenes.Preloader)
    .build();

