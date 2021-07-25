import GameNode, { GameNodeOptions } from "../GameNode";
export interface SpriteOptions extends GameNodeOptions {
    src: string;
    frameWidth?: number;
    frameHeight?: number;
    frameCount?: number;
    fps?: number;
}
export default class Sprite extends GameNode {
    private pixiSprites;
    private framePixiSprite;
    private imageWidth;
    private imageHeight;
    private fps;
    private frameWidth;
    private frameHeight;
    private frameCount;
    private realFrame;
    private frame;
    constructor(options: SpriteOptions);
    private changeImage;
    set src(src: string);
    step(deltaTime: number): void;
}
//# sourceMappingURL=Sprite.d.ts.map