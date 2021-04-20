import Fixed, { FixedOptions } from "../Fixed";
import loadTexture from "../loadTexture";
import * as PIXI from "pixi.js";

export interface BackgroundOptions extends FixedOptions {
    src: string;
    repeatX?: boolean;
    repeatY?: boolean;
    gapLeft?: number;
    gapRight?: number;
    gapTop?: number;
    gapBottom?: number;
}

export default class Background extends Fixed {

    private pixiTilingSprite: PIXI.TilingSprite | undefined;
    private pixiSprites: PIXI.Sprite[] = [];

    public width = 0;
    public height = 0;

    constructor(private options: BackgroundOptions) {
        super(options);
        this.src = options.src;
    }

    private get gapLeft() { return this.options.gapLeft === undefined ? 0 : this.options.gapLeft; }
    private get gapRight() { return this.options.gapRight === undefined ? 0 : this.options.gapRight; }
    private get gapTop() { return this.options.gapTop === undefined ? 0 : this.options.gapTop; }
    private get gapBottom() { return this.options.gapBottom === undefined ? 0 : this.options.gapBottom; }

    private async changeImage(src: string) {
        const texture = await loadTexture(src);

        this.width = texture.width;
        this.height = texture.height;

        if (
            this.options.repeatX !== true &&
            this.options.repeatY !== true &&
            this.gapLeft === 0 &&
            this.gapRight === 0 &&
            this.gapTop === 0 &&
            this.gapBottom === 0
        ) {

        }
    }

    public set src(src: string) {
        this.changeImage(src);
    }

    private draw() {
        let xs = this.gapLeft + this.width + this.gapRight;
        let ys = this.gapTop + this.height + this.gapBottom;

    }

    public step(deltaTime: number): void {
        super.step(deltaTime);
        if (this.pixiTilingSprite !== undefined) {
        } else {
            this.draw();
        }
    }

    public delete(): void {
        (this.pixiSprites as unknown) = undefined;
        super.delete();
    }
}