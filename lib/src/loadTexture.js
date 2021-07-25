"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const loadTexture = async (src) => {
    let texture = PIXI.utils.TextureCache[src];
    if (texture === undefined) {
        return new Promise((resolve) => {
            const retry = () => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    img.onload = null;
                    if (PIXI.utils.TextureCache[src] !== undefined) {
                        texture = PIXI.utils.TextureCache[src];
                    }
                    else {
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
exports.default = loadTexture;
//# sourceMappingURL=loadTexture.js.map