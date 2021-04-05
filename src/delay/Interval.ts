import SkyUtil from "skyutil";
import GameNode from "../GameNode";
import Screen from "../Screen";

export default class Interval {

    private after = 0;
    public count = 0;

    constructor(
        private node: GameNode,
        private ms: number,
        private callback: () => boolean | void,
    ) {
        this.resume();
    }

    public resume(): void {
        if (this.screen.intervals.includes(this) !== true) {
            this.screen.intervals.push(this);
        }
    }

    public pause(): void {
        SkyUtil.pull(this.screen.intervals, this);
    }

    public delete(): void {
        this.pause();
    }

    public step(deltaTime: number): void {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.after -= this.ms;
            this.count += 1;
            if (this.callback(this) === false) {
                this.delete();
            }
        }
    }
}
