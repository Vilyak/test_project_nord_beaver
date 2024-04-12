import { Assets, Sprite, Texture } from "pixi.js";
import { AssetsMapping } from "..";

export class AssetsProvider {

    constructor(
        private assets: Record<string, string>
    ) { }

    async preloadAssets() {
        const importantAssets = Object.keys(this.assets).map((key) => ({
            src: key,
            alias: this.assets[key]
        }));

        Assets.addBundle('fonts', [
            { alias: 'Zubilo', src: AssetsMapping.font },
        ]);

        await Assets.loadBundle('fonts');

        await Assets.load(importantAssets);
    }

    getTexture(path: string) {
        return Texture.from(path);
    }

    getSprite(path: string) {
        return new Sprite(this.getTexture(path));
    }
}