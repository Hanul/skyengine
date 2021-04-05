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
    colliders: Area[];
    pixiContainer: PIXI.Container;
    speedX: number;
    speedY: number;
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
    get x(): number;
    set y(y: number);
    get y(): number;
    set scaleX(scaleX: number);
    get scaleX(): number;
    set scaleY(scaleY: number);
    get scaleY(): number;
    moveLeft(options: {
        speed: number;
        accel?: number;
        maxSpeed?: number;
        toX?: number;
    }, moveEndHandler?: () => void): void;
    stopLeft(accel?: number): void;
    moveRight(options: {
        speed: number;
        accel?: number;
        maxSpeed?: number;
        toX?: number;
    }, moveEndHandler?: () => void): void;
    stopRight(accel?: number): void;
    moveUp(options: {
        speed: number;
        accel?: number;
        maxSpeed?: number;
        toY?: number;
    }, moveEndHandler?: () => void): void;
    stopUp(accel?: number): void;
    moveDown(options: {
        speed: number;
        accel?: number;
        maxSpeed?: number;
        toY?: number;
    }, moveEndHandler?: () => void): void;
    stopDown(accel?: number): void;
    step(deltaTime: number): void;
    onMeet(TargetType: {
        new (): any;
    }, callback: () => void): void;
    appendTo(node: GameNode, index?: number): this;
    exceptFromParent(): void;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map