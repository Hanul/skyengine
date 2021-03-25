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
    public colliders: Area[] = [];
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

    public set x(x: number) { this.pixiContainer.x = x; }
    public get x(): number { return this.pixiContainer.x; }
    public set y(y: number) { this.pixiContainer.y = y; }
    public get y(): number { return this.pixiContainer.y; }
    public set scaleX(scaleX: number) { this.pixiContainer.scale.x = scaleX; }
    public get scaleX(): number { return this.pixiContainer.scale.x; }
    public set scaleY(scaleY: number) { this.pixiContainer.scale.y = scaleY; }
    public get scaleY(): number { return this.pixiContainer.scale.y; }

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