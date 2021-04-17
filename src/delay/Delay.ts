import SkyUtil from "skyutil";
import GameNode from "../GameNode";

export default class Delay {

    private after = 0;

    constructor(
        private node: GameNode,
        private ms: number,
        private callback: () => void,
    ) {
        this.resume();
    }

    public resume(): void {
        if (this.node.delays.includes(this) !== true) {
            this.node.delays.push(this);
        }
    }

    public pause(): void {
        SkyUtil.pull(this.node.delays, this);
    }

    public delete(): void {
        this.pause();
    }

    public step(deltaTime: number): void {
        this.after += deltaTime;
        if (this.after >= this.ms) {
            this.callback();
            this.delete();
        }
    }
}
