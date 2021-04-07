import GameNode, { GameNodeOptions } from "./GameNode";
import Screen from "./Screen";

export interface FixedOptions extends GameNodeOptions {
    fallowRatio?: number;
}

export default class Fixed extends GameNode {

    constructor(options: FixedOptions) {
        super(options);
    }

    public step(screen: Screen, deltaTime: number): void {
        super.step(screen, deltaTime);
    }
}
