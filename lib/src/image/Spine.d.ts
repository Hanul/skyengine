import GameNode, { GameNodeOptions } from "../GameNode";
export interface SpineOptions extends GameNodeOptions {
    json: string;
    atlas: string;
    png: string;
    animation: string;
    skin?: string;
    mixInfos?: {
        from: number;
        to: number;
        duration: number;
    }[];
}
export default class Spine extends GameNode {
    private options;
    private skin;
    private pixiSpine;
    constructor(options: SpineOptions);
    private load;
}
//# sourceMappingURL=Spine.d.ts.map