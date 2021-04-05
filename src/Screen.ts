import { DomNode, el } from "@hanul/skynode";
import * as PIXI from "pixi.js";
import Camera from "./Camera";
import GameNode from "./GameNode";

export interface ScreenOptions {
    fps?: number;
    width: number;
    height: number;
}

export default class Screen extends DomNode<HTMLDivElement> {

    private static readonly WINDOW_BLUR_FPS = 1;

    private animationInterval: number | undefined;
    private beforeTime = 0;
    private timeSigma = 0;
    private fps: number | undefined;
    private originFPS: number | undefined;

    protected canvas: DomNode<HTMLCanvasElement>;
    protected renderer: PIXI.Renderer;
    public root = new GameNode({ x: 0, y: 0 });
    private camera = new Camera();

    public width = 0;
    public height = 0;

    constructor(options: ScreenOptions) {
        super(document.createElement("div"));

        this.fps = options.fps;

        this.append(this.canvas = el("canvas"));

        this.renderer = new PIXI.Renderer({ view: this.canvas.domElement, transparent: true });
        this.renderer.plugins.interaction.autoPreventDefault = false;

        if (options.width !== undefined && options.height !== undefined) {
            this.resize(options.width, options.height);
        }
        this.resume();

        window.addEventListener("blur", this.windowBlurHandler);
        window.addEventListener("focus", this.windowFocusHandler);
    }

    public resize(width: number, height: number, ratio = 1): void {
        this.canvas.style({ width: width * ratio, height: height * ratio });
        this.canvas.domElement.width = width * devicePixelRatio;
        this.canvas.domElement.height = height * devicePixelRatio;
        this.renderer.resize(width, height);
        this.width = width; this.height = height;
    }

    private step(deltaTime: number) {
        this.root.step(deltaTime);

        // root to center of screen
        this.root.x = this.width / 2 - this.camera.x;
        this.root.y = this.height / 2 - this.camera.y;

        this.renderer.render(this.root.pixiContainer);
    }

    private windowBlurHandler = () => {
        this.originFPS = this.fps;
        this.fps = Screen.WINDOW_BLUR_FPS;
    };

    private windowFocusHandler = () => {
        this.fps = this.originFPS;
    };

    private tic = (now: number) => {
        const deltaTime = now - this.beforeTime;
        if (deltaTime > 0) {
            if (this.fps !== undefined && this.fps > 0) {
                this.timeSigma += deltaTime;
                const frameSecond = 1000 / this.fps;
                if (this.timeSigma >= frameSecond) {
                    this.step(frameSecond);
                    this.timeSigma -= frameSecond;
                }
            } else {
                this.step(deltaTime);
            }
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this.tic);
    };

    public resume(): void {
        if (this.animationInterval === undefined) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }

    public pause(): void {
        if (this.animationInterval !== undefined) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
    }

    public delete(): void {
        window.removeEventListener("blur", this.windowBlurHandler);
        window.removeEventListener("focus", this.windowFocusHandler);
        super.delete();
    }
}
