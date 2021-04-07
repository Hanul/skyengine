import GameNode from "../GameNode";
export default class Delay {
    private node;
    private ms;
    private callback;
    private after;
    constructor(node: GameNode, ms: number, callback: () => void);
    resume(): void;
    pause(): void;
    delete(): void;
    step(deltaTime: number): void;
}
//# sourceMappingURL=Delay.d.ts.map