import * as PIXI from "pixi.js";

const loadTexture = async (src: string): Promise<PIXI.Texture> => {

    let texture: PIXI.Texture = PIXI.utils.TextureCache[src];
    if (texture === undefined) {
        return new Promise((resolve) => {
            const retry = () => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    img.onload = null;
                    if (PIXI.utils.TextureCache[src] !== undefined) {
                        texture = PIXI.utils.TextureCache[src];
                    } else {
                        texture = PIXI.Texture.from(img);
                        PIXI.Texture.addToCache(texture, src);
                    }
                    resolve(texture);
                };
                img.onerror = () => retry();
                img.src = src;
            };
            retry();
        });
    }

    else {
        return texture;
    }
};

export default loadTexture;
