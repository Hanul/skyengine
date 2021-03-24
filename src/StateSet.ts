import GameNode, { GameNodeOptions } from "./GameNode";

export interface StateSetOptions extends GameNodeOptions {
    states: { [state: string]: GameNode };
    baseState: string;
}

export default class StateSet extends GameNode {
}
