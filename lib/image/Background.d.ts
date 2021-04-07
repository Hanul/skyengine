import Fixed, { FixedOptions } from "../Fixed";
import Screen from "../Screen";
export interface BackgroundOptions extends FixedOptions {
    src: string;
    repeatX?: boolean;
    repeatY?: boolean;
    gapLeft?: number;
    gapRight?: number;
    gapTop?: number;
    gapBottom?: number;
}
export default class Background extends Fixed {
    private options;
    private pixiTilingSprite;
    private pixiSprites;
    width: number;
    height: number;
    constructor(options: BackgroundOptions);
    private get gapLeft();
    private get gapRight();
    private get gapTop();
    private get gapBottom();
    private changeImage;
    set src(src: string);
    private draw;
    step(screen: Screen, deltaTime: number): void;
    delete(): void;
}
//# sourceMappingURL=Background.d.ts.map