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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const PIXI = __importStar(require("pixi.js"));
const Camera_1 = __importDefault(require("./Camera"));
const GameNode_1 = __importDefault(require("./GameNode"));
class Screen extends skynode_1.DomNode {
    constructor(options) {
        super(document.createElement("div"));
        this.beforeTime = 0;
        this.timeSigma = 0;
        this.root = new GameNode_1.default({ x: 0, y: 0 });
        this.camera = new Camera_1.default();
        this.width = 0;
        this.height = 0;
        this.windowBlurHandler = () => {
            this.originFPS = this.fps;
            this.fps = Screen.WINDOW_BLUR_FPS;
        };
        this.windowFocusHandler = () => {
            this.fps = this.originFPS;
        };
        this.tic = (now) => {
            const deltaTime = now - this.beforeTime;
            if (deltaTime > 0) {
                if (this.fps !== undefined && this.fps > 0) {
                    this.timeSigma += deltaTime;
                    const frameSecond = 1000 / this.fps;
                    if (this.timeSigma >= frameSecond) {
                        this.step(frameSecond);
                        this.timeSigma -= frameSecond;
                    }
                }
                else {
                    this.step(deltaTime);
                }
                this.beforeTime = now;
            }
            this.animationInterval = requestAnimationFrame(this.tic);
        };
        this.fps = options.fps;
        this.append(this.canvas = skynode_1.el("canvas"));
        this.renderer = new PIXI.Renderer({ view: this.canvas.domElement, transparent: true });
        this.renderer.plugins.interaction.autoPreventDefault = false;
        if (options.width !== undefined && options.height !== undefined) {
            this.resize(options.width, options.height);
        }
        this.resume();
        window.addEventListener("blur", this.windowBlurHandler);
        window.addEventListener("focus", this.windowFocusHandler);
    }
    resize(width, height, ratio = 1) {
        this.canvas.style({ width: width * ratio, height: height * ratio });
        this.canvas.domElement.width = width * devicePixelRatio;
        this.canvas.domElement.height = height * devicePixelRatio;
        this.renderer.resize(width, height);
        this.width = width;
        this.height = height;
    }
    step(deltaTime) {
        this.root.step(deltaTime);
        this.root.x = this.width / 2 - this.camera.x;
        this.root.y = this.height / 2 - this.camera.y;
        this.renderer.render(this.root.pixiContainer);
    }
    resume() {
        if (this.animationInterval === undefined) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
    pause() {
        if (this.animationInterval !== undefined) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
    }
    delete() {
        window.removeEventListener("blur", this.windowBlurHandler);
        window.removeEventListener("focus", this.windowFocusHandler);
        super.delete();
    }
}
exports.default = Screen;
Screen.WINDOW_BLUR_FPS = 1;
//# sourceMappingURL=Screen.js.map