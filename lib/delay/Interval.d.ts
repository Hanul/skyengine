import Screen from "../Screen";
export default class Interval {
    private screen;
    private ms;
    private callback;
    private after;
    count: number;
    constructor(screen: Screen, ms: number, callback: (interval: Interval) => boolean);
    resume(): void;
    pause(): void;
    delete(): void;
    step(deltaTime: number): void;
}
//# sourceMappingURL=Interval.d.ts.map