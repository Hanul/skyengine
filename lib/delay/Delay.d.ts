import Screen from "../Screen";
export default class Delay {
    private screen;
    private ms;
    private callback;
    private after;
    constructor(screen: Screen, ms: number, callback: () => void);
    resume(): void;
    pause(): void;
    delete(): void;
    step(deltaTime: number): void;
}
//# sourceMappingURL=Delay.d.ts.map