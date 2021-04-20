import * as PIXI from "pixi.js";
import SkyUtil from "skyutil";
import GameNode, { GameNodeOptions } from "../GameNode";
import loadTexture from "../loadTexture";

export interface SpriteOptions extends GameNodeOptions {
    src: string;
    frameWidth?: number;
    frameHeight?: number;
    frameCount?: number;
    fps?: number;
}

export default class Sprite extends GameNode {

    private pixiSprites: PIXI.Sprite[] = [];
    private framePixiSprite: PIXI.Sprite | undefined;

    private imageWidth = 0;
    private imageHeight = 0;

    private fps = 0;
    private frameWidth: number | undefined;
    private frameHeight: number | undefined;
    private frameCount: number | undefined;

    private realFrame = 0;
    private frame = 0;

    constructor(options: SpriteOptions) {
        super(options);
        this.src = options.src;
        this.frameWidth = options.frameWidth;
        this.frameHeight = options.frameHeight;
        this.frameCount = options.frameCount;
        if (options.fps !== undefined) {
            this.fps = options.fps;
        }
    }

    private async changeImage(src: string) {
        const texture = await loadTexture(src);

        this.imageWidth = texture.width;
        this.imageHeight = texture.height;

        if (this.frameWidth === undefined) {
            if (this.frameCount !== undefined) {
                this.frameWidth = this.imageWidth / this.frameCount;
            } else {
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

        SkyUtil.repeat(this.frameCount, (frameIndex) => {

            const left = (frameIndex % rowFrameCount) * this.frameWidth!;
            const top = Math.floor(frameIndex / rowFrameCount) * this.frameHeight!;

            const frameSrc = `${src}:${left},${top}`;

            let frameTexture;
            if (PIXI.utils.TextureCache[frameSrc] !== undefined) {
                frameTexture = PIXI.utils.TextureCache[frameSrc];
            } else {
                frameTexture = new PIXI.Texture(texture.baseTexture, new PIXI.Rectangle(left, top, this.frameWidth, this.frameHeight));
                PIXI.Texture.addToCache(frameTexture, frameSrc);
            }

            const pixiSprite = PIXI.Sprite.from(frameTexture);
            pixiSprite.anchor.x = 0.5;
            pixiSprite.anchor.y = 0.5;
            this.pixiSprites[frameIndex] = pixiSprite;
        });
    }

    public set src(src: string) {
        this.changeImage(src);
    }

    public step(deltaTime: number): void {

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
