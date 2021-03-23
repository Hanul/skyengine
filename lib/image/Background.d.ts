import Fixed, { FixedOptions } from "../Fixed";
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
    private pixiTilingSprite;
    private pixiSprites;
    constructor(options: BackgroundOptions);
}
//# sourceMappingURL=Background.d.ts.map