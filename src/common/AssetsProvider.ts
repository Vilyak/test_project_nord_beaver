import { Assets, Loader, Sprite, Texture } from "pixi.js";
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

        const manifest = {
            bundles: [
                {
                    name: 'fonts',
                    assets: [
                        { alias: 'Zubilo', src: AssetsMapping.font },
                    ],
                },
                {
                    name: 'textures',
                    assets: importantAssets,
                },
            ]
        };

        await Assets.init({ manifest });

        await Assets.loadBundle('fonts');
        await Assets.backgroundLoadBundle('textures');
    }

    getTexture(path: string) {
        return Texture.from(path);
    }

    getSprite(path: string) {
        return new Sprite(this.getTexture(path));
    }
}