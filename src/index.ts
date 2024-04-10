import { AppBuidler } from './common/AppBuilder';
import { PreloaderController } from './scenes/preloader.ts/PreloaderController';
import { PreloaderModel } from './scenes/preloader.ts/PreloaderModel';
import { PreloaderView } from './scenes/preloader.ts/PreloaderView';

export enum Scenes {
    'Preloader' = 'Preloader',
    'Game' = 'Game'
}

export const AssetsMapping = {
    bunny: 'assets/bunny.png'
} as const;

new AppBuidler()
    .setAssets([
        { assetKey: AssetsMapping.bunny, preload: true }
    ])
    .setScenes([
        { sceneName: Scenes.Preloader, controllerType: PreloaderController, modelType: PreloaderModel, viewType: PreloaderView }
    ])
    .setBackgroundColor(0x1099bb)
    .setResolution(1280, 640)
    .setFirstScene(Scenes.Preloader)
    .build();

