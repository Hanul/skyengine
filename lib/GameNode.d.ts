import { DomNode, SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
import Area from "./area/Area";
export interface GameNodeOptions {
    x?: number;
    y?: number;
    speedX?: number;
    sppedY?: number;
    colliders?: Area[];
    dom?: DomNode;
}
export default class GameNode extends SkyNode {
    parent: GameNode | undefined;
    protected children: GameNode[];
    pixiContainer: PIXI.Container;
    private speedX;
    private speedY;
    private accelX;
    private accelY;
    private minSpeedX;
    private minSpeedY;
    private maxSpeedX;
    private maxSpeedY;
    private toX;
    private toY;
    private moveYEndHandler;
    constructor(options?: GameNodeOptions);
    set x(x: number);
    set y(y: number);
    moveDown(options: {
        speed: number;
        accel?: number;
        maxSpeed?: number;
        toY?: number;
    }, moveEndHandler?: () => void): void;
    step(deltaTime: number): void;
    appendTo(node: GameNode, index?: number): this;
    exceptFromParent(): void;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map