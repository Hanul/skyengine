import * as PIXI from "pixi.js";
import GameObject from "../GameObject";
export default class Image extends GameObject {
    private src;
    private pixiSprite;
    width: number;
    height: number;
    constructor(x: number, y: number, src: string);
    setSrc(src: string): Promise<void>;
    set blendMode(blendMode: PIXI.BLEND_MODES | undefined);
    checkPoint(x: number, y: number): boolean;
    checkOffScreen(): boolean;
    destroy(): void;
}
//# sourceMappingURL=Image.d.ts.map