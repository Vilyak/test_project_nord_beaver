import { Assets, Texture } from "pixi.js";

export type AssetEntity = {
    assetKey: string;
    preload: boolean;
};

export class AssetsProvider {

    constructor(
        private assets: AssetEntity[]
    ) { }

    async preloadAssets() {
        const importantAssets = this.assets.filter(({ preload }) => preload);

        await Assets.load(importantAssets);
    }

    getTexture(path: string) {
        return Texture.from(path);
    }
}