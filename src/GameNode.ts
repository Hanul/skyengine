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

    public parent: GameNode | undefined;
    protected children: GameNode[] = [];
    private colliders: Area[] = [];
    public pixiContainer: PIXI.Container = new PIXI.Container();

    public delays: Delay[] = [];
    public intervals: Interval[] = [];

    public x = 0; public y = 0;
    public scaleX = 0; public scaleY = 0;
    public speedX = 0; public speedY = 0;
    private accelX = 0; private accelY = 0;

    private minSpeedX: number | undefined; private minSpeedY: number | undefined;
    private maxSpeedX: number | undefined; private maxSpeedY: number | undefined;
    private toX: number | undefined; private toY: number | undefined;

    public _worldX = 0; public _worldY = 0;
    public _worldScaleX = 0; public _worldScaleY = 0;

    private moveYEndHandler: (() => void) | undefined;

    constructor(options?: GameNodeOptions) {
        super();
        if (options?.x !== undefined) { this.x = options.x; }
        if (options?.y !== undefined) { this.y = options.y; }
    }

    /*
    // 이하 내용은 step에서
    public set x(x: number) { this.pixiContainer.x = x; }
    public get x(): number { return this.pixiContainer.x; }
    public set y(y: number) { this.pixiContainer.y = y; }
    public get y(): number { return this.pixiContainer.y; }
    public set scaleX(scaleX: number) { this.pixiContainer.scale.x = scaleX; }
    public get scaleX(): number { return this.pixiContainer.scale.x; }
    public set scaleY(scaleY: number) { this.pixiContainer.scale.y = scaleY; }
    public get scaleY(): number { return this.pixiContainer.scale.y; }*/

    public moveLeft(options: {
        speed: number,
        accel?: number,
        maxSpeed?: number,
        toX?: number,
    }, moveEndHandler?: () => void): void {
        this.speedX = -options.speed;
        this.accelX = options.accel === undefined ? 0 : -options.accel;
        this.minSpeedX = options.maxSpeed === undefined ? undefined : -options.maxSpeed;
        this.maxSpeedX = 0;
        this.toX = options.toX;
        if (moveEndHandler !== undefined) {
            this.on("moveEndX", moveEndHandler);
        }
    }

    public stopLeft(accel?: number): void {
        if (accel !== undefined) {
            this.accelX = accel;
            this.maxSpeedX = 0;
        } else if (this.speedX < 0) {
            if (this.accelX < 0) { this.accelX = 0; }
            this.speedX = 0;
        }
    }

    public moveRight(options: {
        speed: number,
        accel?: number,
        maxSpeed?: number,
        toX?: number,
    }, moveEndHandler?: () => void): void {
        this.speedX = options.speed;
        this.accelX = options.accel === undefined ? 0 : options.accel;
        this.minSpeedX = 0;
        this.maxSpeedX = options.maxSpeed;
        this.toX = options.toX;
        if (moveEndHandler !== undefined) {
            this.on("moveEndX", moveEndHandler);
        }
    }

    public stopRight(accel?: number): void {
        if (accel !== undefined) {
            this.accelX = -accel;
            this.minSpeedX = 0;
        } else if (this.speedX > 0) {
            if (this.accelX > 0) { this.accelX = 0; }
            this.speedX = 0;
        }
    }

    public moveUp(options: {
        speed: number,
        accel?: number,
        maxSpeed?: number,
        toY?: number,
    }, moveEndHandler?: () => void): void {
        this.speedY = -options.speed;
        this.accelY = options.accel === undefined ? 0 : -options.accel;
        this.minSpeedY = options.maxSpeed === undefined ? undefined : -options.maxSpeed;
        this.maxSpeedY = 0;
        this.toY = options.toY;
        if (moveEndHandler !== undefined) {
            this.on("moveEndY", moveEndHandler);
        }
    }

    public stopUp(accel?: number): void {
        if (accel !== undefined) {
            this.accelY = accel;
            this.maxSpeedY = 0;
        } else if (this.speedY < 0) {
            if (this.accelY < 0) { this.accelY = 0; }
            this.speedY = 0;
        }
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

    public stopDown(accel?: number): void {
        if (accel !== undefined) {
            this.accelY = -accel;
            this.minSpeedY = 0;
        } else if (this.speedY > 0) {
            if (this.accelY > 0) { this.accelY = 0; }
            this.speedY = 0;
        }
    }

    public step(screen: Screen, deltaTime: number): void {
        for (const child of this.children) { child.step(screen, deltaTime); }
        for (const delay of this.delays) { delay.step(deltaTime); }
        for (const interval of this.intervals) { interval.step(deltaTime); }
    }

    public onMeet(targets: GameNode[], callback: () => void) {
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
        (this.delays as unknown) = undefined;
        (this.intervals as unknown) = undefined;
        super.delete();
    }
}