import * as PIXI from "pixi.js";
import GameNode, { GameNodeOptions } from "../GameNode";
import loadTexture from "../loadTexture";

export interface ImageOptions extends GameNodeOptions {
    src: string;
}

export default class Image extends GameNode {

    private pixiSprite: PIXI.Sprite | undefined;

    public width = 0;
    public height = 0;

    constructor(options: ImageOptions) {
        super(options);
        this.src = options.src;
    }

    private async changeImage(src: string) {
        const texture = await loadTexture(src);

        this.width = texture.width;
        this.height = texture.height;

        this.pixiSprite = PIXI.Sprite.from(texture);
        this.pixiSprite.anchor.x = 0.5;
        this.pixiSprite.anchor.y = 0.5;
        this.pixiContainer.addChild(this.pixiSprite);
    }

    public set src(src: string) {
        this.changeImage(src);
    }
}
