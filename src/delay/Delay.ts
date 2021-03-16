import SkyUtil from "skyutil";
import Screen from "../Screen";

export default class Delay {

    private after = 0;

    constructor(
        private screen: Screen,
        private ms: number,
        private callback: () => void,
    ) {
        this.resume();
    }

    public resume(): void {
        if (this.screen.delays.includes(this) !== true) {
            this.screen.delays.push(this);
        }
    }

    public pause(): void {
        SkyUtil.pull(this.screen.delays, this);
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
