import { DomNode } from "@hanul/skynode";
import GameNode from "./GameNode";
export interface ScreenOptions {
    fps?: number;
    width: number;
    height: number;
}
export default class Screen extends DomNode<HTMLDivElement> {
    private static readonly FPS_WINDOW_BLURRED;
    private animationInterval;
    private beforeTime;
    private timeSigma;
    private fps;
    private originFPS;
    protected canvas: DomNode<HTMLCanvasElement>;
    private renderer;
    root: GameNode;
    private camera;
    width: number;
    height: number;
    constructor(options: ScreenOptions);
    resize(width: number, height: number, ratio?: number): void;
    private step;
    private windowBlurHandler;
    private windowFocusHandler;
    private tic;
    resume(): void;
    pause(): void;
    delete(): void;
}
//# sourceMappingURL=Screen.d.ts.map