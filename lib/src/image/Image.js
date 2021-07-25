"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const GameNode_1 = require("../GameNode");
const loadTexture_1 = require("../loadTexture");
class Image extends GameNode_1.default {
    constructor(options) {
        super(options);
        this.width = 0;
        this.height = 0;
        this.src = options.src;
    }
    async changeImage(src) {
        const texture = await loadTexture_1.default(src);
        this.width = texture.width;
        this.height = texture.height;
        this.pixiSprite = PIXI.Sprite.from(texture);
        this.pixiSprite.anchor.x = 0.5;
        this.pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(this.pixiSprite);
    }
    set src(src) {
        this.changeImage(src);
    }
}
exports.default = Image;
//# sourceMappingURL=Image.js.map