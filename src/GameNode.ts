import { SkyNode } from "@hanul/skynode";
import PIXI from "pixi.js";
import Delay from "./delay/Delay";
import Interval from "./delay/Interval";

export default class GameNode extends SkyNode {

    public parent: GameNode | undefined;
    protected children: GameNode[] = [];
    public delays: Delay[] = [];
    public intervals: Interval[] = [];

    private _x = 0;
    private _y = 0;
    private _centerX = 0;
    private _centerY = 0;
    private _scaleX = 0;
    private _scaleY = 0;
    private _angle = 0;

    public worldX = 0;
    public worldY = 0;
    public drawingX = 0;
    public drawingY = 0;
    public worldScaleX = 0;
    public worldScaleY = 0;
    public worldRadian = 0;
    public worldSin = 0;
    public worldCos = 1;

    private pixiContainer: PIXI.Container = new PIXI.Container();
    public set x(x: number) { this.pixiContainer.x = this._x = x; }
    public get x(): number { return this._x; }
    public set y(y: number) { this.pixiContainer.y = this._y = y; }
    public get y(): number { return this._y; }
    public set scaleX(scaleX: number) { this.pixiContainer.scale.x = this._scaleX = scaleX; }
    public get scaleX(): number { return this._scaleX; }
    public set scaleY(scaleY: number) { this.pixiContainer.scale.y = this._scaleY = scaleY; }
    public get scaleY(): number { return this._scaleY; }
    public set centerX(centerX: number) { this.pixiContainer.pivot.x = this._centerX = centerX; }
    public get centerX(): number { return this._centerX; }
    public set centerY(centerY: number) { this.pixiContainer.pivot.y = this._centerY = centerY; }
    public get centerY(): number { return this._centerY; }
    public set angle(angle: number) { this.pixiContainer.angle = this._angle = angle; }
    public get angle(): number { return this._angle; }

    public speedX = 0; public toX: number | undefined;
    public speedY = 0; public toY: number | undefined;
    public scalingSpeedX = 0; public toScaleX: number | undefined;
    public scalingSpeedY = 0; public toScaleY: number | undefined;
    public rotationSpeed = 0; public toAngle: number | undefined;
    public fadingSpeed = 0; public toAlpha: number | undefined;

    public accelX = 0; public minSpeedX: number | undefined; public maxSpeedX: number | undefined;
    public accelY = 0; public minSpeedY: number | undefined; public maxSpeedY: number | undefined;
    public scalingAccelX = 0; public minScalingSpeedX: number | undefined; public maxScalingSpeedX: number | undefined;
    public scalingAccelY = 0; public minScalingSpeedY: number | undefined; public maxScalingSpeedY: number | undefined;
    public rotationAccel = 0; public minRotationSpeed: number | undefined; public maxRotationSpeed: number | undefined;
    public fadingAccel = 0; public minFadingSpeed: number | undefined; public maxFadingSpeed: number | undefined;

    public step(deltaTime: number): void {
        if (this.parent !== undefined) {

            this.worldRadian = this.parent.worldRadian + this.angle * Math.PI / 180;
            this.worldSin = Math.sin(this.worldRadian);
            this.worldCos = Math.cos(this.worldRadian);
            this.worldScaleX = this.parent.worldScaleX * this.scaleX;
            this.worldScaleX = this.parent.worldScaleY * this.scaleY;
            const relativeX = this.x * this.parent.worldScaleX;
            const relativeY = this.y * this.parent.worldScaleY;
            this.worldX = this.parent.drawingX + relativeX * this.parent.worldCos - relativeY * this.parent.worldSin;
            this.worldY = this.parent.drawingY + relativeX * this.parent.worldSin + relativeY * this.parent.worldCos;
            const relativeCenterX = this.centerX * this.worldScaleX;
            const relativeCenterY = this.centerY * this.worldScaleY;
            this.drawingX = this.worldX - relativeCenterX * this.worldCos + relativeCenterY * this.worldSin;
            this.drawingY = this.worldY - relativeCenterX * this.worldSin - relativeCenterY * this.worldCos;

            for (const child of this.children) { child.step(deltaTime); }
            for (const delay of this.delays) { delay.step(deltaTime); }
            for (const interval of this.intervals) { interval.step(deltaTime); }
        }
    }

    public appendTo(node: GameNode, index?: number): this {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        } else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        return super.appendTo(node, index);
    }

    public delete(): void {
        this.pixiContainer.destroy();
        (this.delays as unknown) = undefined;
        (this.intervals as unknown) = undefined;
        super.delete();
    }

    public onMeet(targets: GameNode[], callback: () => void) {
        //TODO:
    }

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
}