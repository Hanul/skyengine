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
        this.colliders = [];
        this.pixiContainer = new PIXI.Container();
        this.delays = [];
        this.intervals = [];
        this.x = 0;
        this.y = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.accelX = 0;
        this.accelY = 0;
        this._worldX = 0;
        this._worldY = 0;
        this._worldScaleX = 0;
        this._worldScaleY = 0;
        if ((options === null || options === void 0 ? void 0 : options.x) !== undefined) {
            this.x = options.x;
        }
        if ((options === null || options === void 0 ? void 0 : options.y) !== undefined) {
            this.y = options.y;
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
    step(screen, deltaTime) {
        for (const child of this.children) {
            child.step(screen, deltaTime);
        }
        for (const delay of this.delays) {
            delay.step(deltaTime);
        }
        for (const interval of this.intervals) {
            interval.step(deltaTime);
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