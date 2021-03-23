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

    public parent: GameNode | undefined;
    protected children: GameNode[] = [];
    public pixiContainer: PIXI.Container = new PIXI.Container();

    private speedX = 0; private speedY = 0;
    private accelX = 0; private accelY = 0;
    private minSpeedX: number | undefined; private minSpeedY: number | undefined;
    private maxSpeedX: number | undefined; private maxSpeedY: number | undefined;
    private toX: number | undefined; private toY: number | undefined;

    private moveYEndHandler: (() => void) | undefined;

    constructor(options?: GameNodeOptions) {
        super();
        if (options?.x !== undefined) { this.x = options.x; }
        if (options?.y !== undefined) { this.y = options.y; }
    }

    public set x(x: number) {
        this.pixiContainer.x = x;
    }

    public set y(y: number) {
        this.pixiContainer.y = y;
    }

    public moveDown(options: {
        speed: number,
        accel?: number,
        maxSpeed?: number,
        toY?: number,
    }, moveEndHandler?: () => void): void {
        this.speedY = options.speed;
        this.accelY = options.accel === undefined ? 0 : options.accel;
        this.minSpeedY = 0;
        this.maxSpeedY = options.maxSpeed;
        this.toY = options.toY;
        if (moveEndHandler !== undefined) {
            this.on("moveEndY", moveEndHandler);
        }
    }

    public step(deltaTime: number) {
    }

    public appendTo(node: GameNode, index?: number): this {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        } else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        return super.appendTo(node, index);
    }

    public exceptFromParent(): void {
        if (this.parent !== undefined) {
            this.parent.pixiContainer.removeChild(this.pixiContainer);
        }
        super.exceptFromParent();
    }

    public delete(): void {
        this.pixiContainer.destroy();
        super.delete();
    }
}