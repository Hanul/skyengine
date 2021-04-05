import GameNode from "../GameNode";
export default class Interval {
    private node;
    private ms;
    private callback;
    private after;
    count: number;
    constructor(node: GameNode, ms: number, callback: () => boolean | void);
    resume(): void;
    pause(): void;
    delete(): void;
    step(deltaTime: number): void;
}
//# sourceMappingURL=Interval.d.ts.map