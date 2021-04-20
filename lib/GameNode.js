"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PIXI = __importStar(require("pixi.js"));
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
        this.pixiContainer = new PIXI.Container();
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
        if ((options === null || options === void 0 ? void 0 : options.x) !== undefined) {
            this.x = options.x;
        }
        if ((options === null || options === void 0 ? void 0 : options.y) !== undefined) {
            this.y = options.y;
        }
        if ((options === null || options === void 0 ? void 0 : options.centerX) !== undefined) {
            this.centerX = options.centerX;
        }
        if ((options === null || options === void 0 ? void 0 : options.centerY) !== undefined) {
            this.centerY = options.centerY;
        }
        if ((options === null || options === void 0 ? void 0 : options.scaleX) !== undefined) {
            this.scaleX = options.scaleX;
        }
        if ((options === null || options === void 0 ? void 0 : options.scaleY) !== undefined) {
            this.scaleY = options.scaleY;
        }
        if ((options === null || options === void 0 ? void 0 : options.angle) !== undefined) {
            this.angle = options.angle;
        }
        if ((options === null || options === void 0 ? void 0 : options.speedX) !== undefined) {
            this.speedX = options.speedX;
        }
        this.toX = options === null || options === void 0 ? void 0 : options.toX;
        if ((options === null || options === void 0 ? void 0 : options.speedY) !== undefined) {
            this.speedY = options.speedY;
        }
        this.toY = options === null || options === void 0 ? void 0 : options.toY;
        if ((options === null || options === void 0 ? void 0 : options.scalingSpeedX) !== undefined) {
            this.scalingSpeedX = options.scalingSpeedX;
        }
        this.toScaleX = options === null || options === void 0 ? void 0 : options.toScaleX;
        if ((options === null || options === void 0 ? void 0 : options.scalingSpeedY) !== undefined) {
            this.scalingSpeedY = options.scalingSpeedY;
        }
        this.toScaleY = options === null || options === void 0 ? void 0 : options.toScaleY;
        if ((options === null || options === void 0 ? void 0 : options.rotationSpeed) !== undefined) {
            this.rotationSpeed = options.rotationSpeed;
        }
        this.toAngle = options === null || options === void 0 ? void 0 : options.toAngle;
        if ((options === null || options === void 0 ? void 0 : options.fadingSpeed) !== undefined) {
            this.fadingSpeed = options.fadingSpeed;
        }
        this.toAlpha = options === null || options === void 0 ? void 0 : options.toAlpha;
        if ((options === null || options === void 0 ? void 0 : options.accelX) !== undefined) {
            this.accelX = options.accelX;
        }
        this.minSpeedX = options === null || options === void 0 ? void 0 : options.minSpeedX;
        this.maxSpeedX = options === null || options === void 0 ? void 0 : options.maxSpeedX;
        if ((options === null || options === void 0 ? void 0 : options.accelY) !== undefined) {
            this.accelY = options.accelY;
        }
        this.minSpeedY = options === null || options === void 0 ? void 0 : options.minSpeedY;
        this.maxSpeedY = options === null || options === void 0 ? void 0 : options.maxSpeedY;
        if ((options === null || options === void 0 ? void 0 : options.scalingAccelX) !== undefined) {
            this.scalingAccelX = options.scalingAccelX;
        }
        this.minScalingSpeedX = options === null || options === void 0 ? void 0 : options.minScalingSpeedX;
        this.maxScalingSpeedX = options === null || options === void 0 ? void 0 : options.maxScalingSpeedX;
        if ((options === null || options === void 0 ? void 0 : options.scalingAccelY) !== undefined) {
            this.scalingAccelY = options.scalingAccelY;
        }
        this.minScalingSpeedY = options === null || options === void 0 ? void 0 : options.minScalingSpeedY;
        this.maxScalingSpeedY = options === null || options === void 0 ? void 0 : options.maxScalingSpeedY;
        if ((options === null || options === void 0 ? void 0 : options.rotationAccel) !== undefined) {
            this.rotationAccel = options.rotationAccel;
        }
        this.minRotationSpeed = options === null || options === void 0 ? void 0 : options.minRotationSpeed;
        this.maxRotationSpeed = options === null || options === void 0 ? void 0 : options.maxRotationSpeed;
        if ((options === null || options === void 0 ? void 0 : options.fadingAccel) !== undefined) {
            this.fadingAccel = options.fadingAccel;
        }
        this.minFadingSpeed = options === null || options === void 0 ? void 0 : options.minFadingSpeed;
        this.maxFadingSpeed = options === null || options === void 0 ? void 0 : options.maxFadingSpeed;
        if ((options === null || options === void 0 ? void 0 : options.colliders) !== undefined) {
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
        }
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
    onMeet(targets, callback) {
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
}
exports.default = GameNode;
//# sourceMappingURL=GameNode.js.map