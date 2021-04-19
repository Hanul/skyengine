import GameNode, { GameNodeOptions } from "./GameNode";

export interface FixedOptions extends GameNodeOptions {
    fallowRatio?: number;
}

export default class Fixed extends GameNode {

    constructor(options: FixedOptions) {
        super(options);
    }
}
