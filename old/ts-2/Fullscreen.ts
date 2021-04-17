import { BodyNode } from "@hanul/skynode";
import Letterbox from "./Letterbox";
import Screen from "./Screen";

export interface FullscreenOptions {
    fps?: number;
    width?: number; height?: number;
    minWidth?: number; minHeight?: number;
    maxWidth?: number; maxHeight?: number;
}

export default class Fullscreen extends Screen {

    public ratio = 1;
    public left = 0; public top = 0;

    private topLetterbox: Letterbox = new Letterbox();
    private bottomLetterbox: Letterbox = new Letterbox();
    private leftLetterbox: Letterbox = new Letterbox();
    private rightLetterbox: Letterbox = new Letterbox();

    constructor(private options: FullscreenOptions = {}) {

        super({
            fps: options.fps,
            width: options.width === undefined ? 0 : options.width,
            height: options.height === undefined ? 0 : options.height,
        });

        this.style({
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
        });

        this.canvas.style({
            position: "fixed",
            zIndex: -1,
        });

        this.append(this.topLetterbox, this.bottomLetterbox, this.leftLetterbox, this.rightLetterbox);

        this.topLetterbox.style({ left: 0, top: 0, width: "100%" });
        this.bottomLetterbox.style({ left: 0, bottom: 0, width: "100%" });
        this.leftLetterbox.style({ left: 0, top: 0, height: "100%" });
        this.rightLetterbox.style({ right: 0, top: 0, height: "100%" });

        window.addEventListener("resize", this.windowResizeHandler);
        this.windowResizeHandler();

        BodyNode.append(this);
    }

    private windowResizeHandler = () => {

        const winWidth = document.documentElement.clientWidth;
        const winHeight = window.innerHeight;

        let isToFixWidth = false;
        let isToFixHeight = false;

        if (this.options.width === undefined) {
            this.width = winWidth;
            isToFixWidth = true;
        }

        if (this.options.height === undefined) {
            this.height = winHeight;
            isToFixHeight = true;
        }

        let widthRatio = winWidth / this.width;
        let heightRatio = winHeight / this.height;

        if (widthRatio < heightRatio) { this.ratio = widthRatio; }
        else { this.ratio = heightRatio; }

        if (this.options.minWidth !== undefined && this.width / this.ratio < this.options.minWidth) {
            this.width = this.options.minWidth;
            isToFixWidth = false;
        }

        if (this.options.minHeight !== undefined && this.height / this.ratio < this.options.minHeight) {
            this.height = this.options.minHeight;
            isToFixHeight = false;
        }

        widthRatio = winWidth / this.width;
        heightRatio = winHeight / this.height;

        if (widthRatio < heightRatio) { this.ratio = widthRatio; }
        else { this.ratio = heightRatio; }

        if (isToFixWidth === true) { this.width /= this.ratio; }
        if (isToFixHeight === true) { this.height /= this.ratio; }

        if (this.options.maxWidth !== undefined && this.width > this.options.maxWidth) {
            this.width = this.options.maxWidth;
        }

        if (this.options.maxHeight !== undefined && this.height > this.options.maxHeight) {
            this.height = this.options.maxHeight;
        }

        this.left = (winWidth - this.width * this.ratio) / 2;
        this.top = (winHeight - this.height * this.ratio) / 2;

        this.canvas.style({ left: this.left, top: this.top });
        this.resize(this.width, this.height, this.ratio);

        this.leftLetterbox.style({ width: this.left });
        this.topLetterbox.style({ height: this.top });
        this.rightLetterbox.style({ width: this.left });
        this.bottomLetterbox.style({ height: this.top });
    };

    public delete(): void {
        window.removeEventListener("resize", this.windowResizeHandler);
        super.delete();
    }
}
