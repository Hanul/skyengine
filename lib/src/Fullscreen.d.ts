import Screen from "./Screen";
export interface FullscreenOptions {
    fps?: number;
    width?: number;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}
export default class Fullscreen extends Screen {
    private options;
    ratio: number;
    left: number;
    top: number;
    private topLetterbox;
    private bottomLetterbox;
    private leftLetterbox;
    private rightLetterbox;
    constructor(options?: FullscreenOptions);
    private windowResizeHandler;
    delete(): void;
}
//# sourceMappingURL=Fullscreen.d.ts.map