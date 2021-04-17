"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const pixi_js_1 = __importDefault(require("pixi.js"));
class GameNode extends skynode_1.SkyNode {
    constructor(options) {
        super();
        this.children = [];
        this.delays = [];
        this.intervals = [];
        this.colliders = [];
        this._x = 0;
        this._y = 0;
        this._centerX = 0;
        this._centerY = 0;
        this._scaleX = 0;
        this._scaleY = 0;
        this._angle = 0;
        this.worldX = 0;
        this.worldY = 0;
        this.drawingX = 0;
        this.drawingY = 0;
        this.worldScaleX = 0;
        this.worldScaleY = 0;
        this.worldRadian = 0;
        this.worldSin = 0;
        this.worldCos = 1;
        this.pixiContainer = new pixi_js_1.default.Container();
        this.speedX = 0;
        this.speedY = 0;
        this.scalingSpeedX = 0;
        this.scalingSpeedY = 0;
        this.rotationSpeed = 0;
        this.fadingSpeed = 0;
        this.accelX = 0;
        this.accelY = 0;
        this.scalingAccelX = 0;
        this.scalingAccelY = 0;
        this.rotationAccel = 0;
        this.fadingAccel = 0;
        if (options.x !== undefined) {
            this.x = options.x;
        }
        if (options.y !== undefined) {
            this.y = options.y;
        }
        if (options.centerX !== undefined) {
            this.centerX = options.centerX;
        }
        if (options.centerY !== undefined) {
            this.centerY = options.centerY;
        }
        if (options.scaleX !== undefined) {
            this.scaleX = options.scaleX;
        }
        if (options.scaleY !== undefined) {
            this.scaleY = options.scaleY;
        }
        if (options.angle !== undefined) {
            this.angle = options.angle;
        }
        if (options.speedX !== undefined) {
            this.speedX = options.speedX;
        }
        this.toX = options.toX;
        if (options.speedY !== undefined) {
            this.speedY = options.speedY;
        }
        this.toY = options.toY;
        if (options.scalingSpeedX !== undefined) {
            this.scalingSpeedX = options.scalingSpeedX;
        }
        this.toScaleX = options.toScaleX;
        if (options.scalingSpeedY !== undefined) {
            this.scalingSpeedY = options.scalingSpeedY;
        }
        this.toScaleY = options.toScaleY;
        if (options.rotationSpeed !== undefined) {
            this.rotationSpeed = options.rotationSpeed;
        }
        this.toAngle = options.toAngle;
        if (options.fadingSpeed !== undefined) {
            this.fadingSpeed = options.fadingSpeed;
        }
        this.toAlpha = options.toAlpha;
        if (options.accelX !== undefined) {
            this.accelX = options.accelX;
        }
        this.minSpeedX = options.minSpeedX;
        this.maxSpeedX = options.maxSpeedX;
        if (options.accelY !== undefined) {
            this.accelY = options.accelY;
        }
        this.minSpeedY = options.minSpeedY;
        this.maxSpeedY = options.maxSpeedY;
        if (options.scalingAccelX !== undefined) {
            this.scalingAccelX = options.scalingAccelX;
        }
        this.minScalingSpeedX = options.minScalingSpeedX;
        this.maxScalingSpeedX = options.maxScalingSpeedX;
        if (options.scalingAccelY !== undefined) {
            this.scalingAccelY = options.scalingAccelY;
        }
        this.minScalingSpeedY = options.minScalingSpeedY;
        this.maxScalingSpeedY = options.maxScalingSpeedY;
        if (options.rotationAccel !== undefined) {
            this.rotationAccel = options.rotationAccel;
        }
        this.minRotationSpeed = options.minRotationSpeed;
        this.maxRotationSpeed = options.maxRotationSpeed;
        if (options.fadingAccel !== undefined) {
            this.fadingAccel = options.fadingAccel;
        }
        this.minFadingSpeed = options.minFadingSpeed;
        this.maxFadingSpeed = options.maxFadingSpeed;
        if (options.colliders !== undefined) {
            this.colliders = options.colliders;
        }
    }
    set x(x) { this.pixiContainer.x = this._x = x; }
    get x() { return this._x; }
    set y(y) { this.pixiContainer.y = this._y = y; }
    get y() { return this._y; }
    set scaleX(scaleX) { this.pixiContainer.scale.x = this._scaleX = scaleX; }
    get scaleX() { return this._scaleX; }
    set scaleY(scaleY) { this.pixiContainer.scale.y = this._scaleY = scaleY; }
    get scaleY() { return this._scaleY; }
    set centerX(centerX) { this.pixiContainer.pivot.x = this._centerX = centerX; }
    get centerX() { return this._centerX; }
    set centerY(centerY) { this.pixiContainer.pivot.y = this._centerY = centerY; }
    get centerY() { return this._centerY; }
    set angle(angle) { this.pixiContainer.angle = this._angle = angle; }
    get angle() { return this._angle; }
    step(deltaTime) {
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
            for (const child of this.children) {
                child.step(deltaTime);
            }
            for (const delay of this.delays) {
                delay.step(deltaTime);
            }
            for (const interval of this.intervals) {
                interval.step(deltaTime);
            }
        }
    }
    appendTo(node, index) {
        if (index !== undefined && index < node.children.length) {
            node.pixiContainer.addChildAt(this.pixiContainer, index);
        }
        else {
            node.pixiContainer.addChild(this.pixiContainer);
        }
        return super.appendTo(node, index);
    }
    delete() {
        this.pixiContainer.destroy();
        this.delays = undefined;
        this.intervals = undefined;
        super.delete();
    }
    onMeet(targets, callback) {
    }
    moveLeft(options, moveEndHandler) {
        this.speedX = -options.speed;
        this.accelX = options.accel === undefined ? 0 : -options.accel;
        this.minSpeedX = options.maxSpeed === undefined ? undefined : -options.maxSpeed;
        this.maxSpeedX = 0;
        this.toX = options.toX;
        if (moveEndHandler !== undefined) {
            this.on("moveEndX", moveEndHandler);
        }
    }
    stopLeft(accel) {
        if (accel !== undefined) {
            this.accelX = accel;
            this.maxSpeedX = 0;
        }
        else if (this.speedX < 0) {
            if (this.accelX < 0) {
                this.accelX = 0;
            }
            this.speedX = 0;
        }
    }
    moveRight(options, moveEndHandler) {
        this.speedX = options.speed;
        this.accelX = options.accel === undefined ? 0 : options.accel;
        this.minSpeedX = 0;
        this.maxSpeedX = options.maxSpeed;
        this.toX = options.toX;
        if (moveEndHandler !== undefined) {
            this.on("moveEndX", moveEndHandler);
        }
    }
    stopRight(accel) {
        if (accel !== undefined) {
            this.accelX = -accel;
            this.minSpeedX = 0;
        }
        else if (this.speedX > 0) {
            if (this.accelX > 0) {
                this.accelX = 0;
            }
            this.speedX = 0;
        }
    }
    moveUp(options, moveEndHandler) {
        this.speedY = -options.speed;
        this.accelY = options.accel === undefined ? 0 : -options.accel;
        this.minSpeedY = options.maxSpeed === undefined ? undefined : -options.maxSpeed;
        this.maxSpeedY = 0;
        this.toY = options.toY;
        if (moveEndHandler !== undefined) {
            this.on("moveEndY", moveEndHandler);
        }
    }
    stopUp(accel) {
        if (accel !== undefined) {
            this.accelY = accel;
            this.maxSpeedY = 0;
        }
        else if (this.speedY < 0) {
            if (this.accelY < 0) {
                this.accelY = 0;
            }
            this.speedY = 0;
        }
    }
    moveDown(options, moveEndHandler) {
        this.speedY = options.speed;
        this.accelY = options.accel === undefined ? 0 : options.accel;
        this.minSpeedY = 0;
        this.maxSpeedY = options.maxSpeed;
        this.toY = options.toY;
        if (moveEndHandler !== undefined) {
            this.on("moveEndY", moveEndHandler);
        }
    }
    stopDown(accel) {
        if (accel !== undefined) {
            this.accelY = -accel;
            this.minSpeedY = 0;
        }
        else if (this.speedY > 0) {
            if (this.accelY > 0) {
                this.accelY = 0;
            }
            this.speedY = 0;
        }
    }
}
exports.default = GameNode;
//# sourceMappingURL=GameNode.js.map