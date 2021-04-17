import SkyUtil from "skyutil";
import GameNode from "../GameNode";

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
        if (this.node.intervals.includes(this) !== true) {
            this.node.intervals.push(this);
        }
    }

    public pause(): void {
        SkyUtil.pull(this.node.intervals, this);
    }

    public delete(): void {
        this.pause();
    }

    public step(deltaTime: number): void {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.after -= this.ms;
            this.count += 1;
            if (this.callback() === false) {
                this.delete();
            }
        }
    }
}
