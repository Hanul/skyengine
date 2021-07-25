"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const skyutil_1 = require("skyutil");
const GameNode_1 = require("../GameNode");
const loadTexture_1 = require("../loadTexture");
class Sprite extends GameNode_1.default {
    constructor(options) {
        super(options);
        this.pixiSprites = [];
        this.imageWidth = 0;
        this.imageHeight = 0;
        this.fps = 0;
        this.realFrame = 0;
        this.frame = 0;
        this.src = options.src;
        this.frameWidth = options.frameWidth;
        this.frameHeight = options.frameHeight;
        this.frameCount = options.frameCount;
        if (options.fps !== undefined) {
            this.fps = options.fps;
        }
    }
    async changeImage(src) {
        const texture = await loadTexture_1.default(src);
        this.imageWidth = texture.width;
        this.imageHeight = texture.height;
        if (this.frameWidth === undefined) {
            if (this.frameCount !== undefined) {
                this.frameWidth = this.imageWidth / this.frameCount;
            }
            else {
                this.frameWidth = this.imageWidth;
            }
        }
        if (this.frameHeight === undefined) {
            this.frameHeight = this.imageHeight;
        }
        if (this.frameCount === undefined) {
            this.frameCount = this.imageWidth / this.frameWidth * this.imageHeight / this.frameHeight;
        }
        const rowFrameCount = this.imageWidth / this.frameWidth;
        skyutil_1.default.repeat(this.frameCount, (frameIndex) => {
            const left = (frameIndex % rowFrameCount) * this.frameWidth;
            const top = Math.floor(frameIndex / rowFrameCount) * this.frameHeight;
            const frameSrc = `${src}:${left},${top}`;
            let frameTexture;
            if (PIXI.utils.TextureCache[frameSrc] !== undefined) {
                frameTexture = PIXI.utils.TextureCache[frameSrc];
            }
            else {
                frameTexture = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(left, top, this.frameWidth, this.frameHeight));
                PIXI.Texture.addToCache(frameTexture, frameSrc);
            }
            const pixiSprite = PIXI.Sprite.from(frameTexture);
            pixiSprite.anchor.x = 0.5;
            pixiSprite.anchor.y = 0.5;
            this.pixiSprites[frameIndex] = pixiSprite;
        });
    }
    set src(src) {
        this.changeImage(src);
    }
    step(deltaTime) {
        if (this.fps > 0) {
            this.realFrame += this.fps * deltaTime / 1000;
        }
        if (this.frameCount !== undefined) {
            if (this.realFrame >= this.frameCount) {
                this.realFrame %= this.frameCount;
            }
        }
        this.frame = Math.floor(this.realFrame);
        if (this.framePixiSprite !== undefined) {
            this.pixiContainer.removeChild(this.framePixiSprite);
        }
        this.framePixiSprite = this.pixiSprites[this.frame];
        if (this.framePixiSprite !== undefined) {
            this.pixiContainer.addChild(this.framePixiSprite);
        }
        super.step(deltaTime);
    }
}
exports.default = Sprite;
//# sourceMappingURL=Sprite.js.map