import GameNode, { GameNodeOptions } from "./GameNode";

export interface StateSetOptions extends GameNodeOptions {
    states: { [state: string]: GameNode };
    baseState: string;
}

export default class StateSet extends GameNode {

    private currentState: string;

    constructor(options: StateSetOptions) {
        super(options);
        this.currentState = options.baseState;
    }

    public get state(): string {
        return this.currentState;
    }

    public set state(state: string) {
        this.currentState = state;
    }
}
