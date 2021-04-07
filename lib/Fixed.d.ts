import GameNode, { GameNodeOptions } from "./GameNode";
import Screen from "./Screen";
export interface FixedOptions extends GameNodeOptions {
    fallowRatio?: number;
}
export default class Fixed extends GameNode {
    constructor(options: FixedOptions);
    step(screen: Screen, deltaTime: number): void;
}
//# sourceMappingURL=Fixed.d.ts.map