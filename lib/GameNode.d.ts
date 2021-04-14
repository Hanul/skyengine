import { DomNode, SkyNode } from "@hanul/skynode";
import * as PIXI from "pixi.js";
import Area from "./area/Area";
import Delay from "./delay/Delay";
import Interval from "./delay/Interval";
import Screen from "./Screen";
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
    private colliders;
    pixiContainer: PIXI.Container;
    delays: Delay[];
    intervals: Interval[];
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
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
    _worldX: number;
    _worldY: number;
    _worldScaleX: number;
    _worldScaleY: number;
    private moveYEndHandler;
    constructor(options?: GameNodeOptions);
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
    step(screen: Screen, deltaTime: number): void;
    onMeet(targets: GameNode[], callback: () => void): void;
    appendTo(node: GameNode, index?: number): this;
    delete(): void;
}
//# sourceMappingURL=GameNode.d.ts.map